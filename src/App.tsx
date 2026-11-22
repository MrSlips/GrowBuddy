import { useCallback, useEffect, useRef, useState } from 'react';
import { Award, Flower2, Sprout } from 'lucide-react';
import { CollectionView } from './components/CollectionView';
import { GardenView } from './components/GardenView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { SeedSelectView } from './components/SeedSelectView';
import { StageModal } from './components/StageModal';
import {
  CareActionType,
  DEFAULT_GAME_STATE,
  FloatingEffect,
  GameState,
  PLANT_TYPES,
  PlantKey,
  ScreenTab,
} from './types/game';
import {
  AppNotificationPermission,
  getNotificationPermission,
  requestNotificationPermission,
  sendLowHealthNotification,
} from './utils/notifications';
import { playCareSound, playStageUpSound } from './utils/sound';

const STORAGE_KEY = 'growbuddy_save';

function loadSavedState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GAME_STATE;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    const validKey: PlantKey =
      parsed.currentPlantKey && parsed.currentPlantKey in PLANT_TYPES
        ? parsed.currentPlantKey
        : 'sunflower';

    return {
      currentPlantKey: validKey,
      stage:
        typeof parsed.stage === 'number'
          ? Math.min(5, Math.max(1, parsed.stage))
          : 1,
      growthProgress:
        typeof parsed.growthProgress === 'number'
          ? Math.min(100, Math.max(0, parsed.growthProgress))
          : 0,
      water:
        typeof parsed.water === 'number'
          ? Math.min(100, Math.max(0, parsed.water))
          : 60,
      sun:
        typeof parsed.sun === 'number'
          ? Math.min(100, Math.max(0, parsed.sun))
          : 60,
      health:
        typeof parsed.health === 'number'
          ? Math.min(100, Math.max(0, parsed.health))
          : 100,
      score: typeof parsed.score === 'number' ? Math.max(0, parsed.score) : 0,
      collection: Array.isArray(parsed.collection) ? parsed.collection : [],
      harvestCounts:
        parsed.harvestCounts && typeof parsed.harvestCounts === 'object'
          ? parsed.harvestCounts
          : {},
      badges:
        Array.isArray(parsed.badges) && parsed.badges.length > 0
          ? parsed.badges
          : ['Pemula Taman'],
    };
  } catch {
    return DEFAULT_GAME_STATE;
  }
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => loadSavedState());
  const [activeTab, setActiveTab] = useState<ScreenTab>('game');
  const [customStatus, setCustomStatus] = useState<string | null>(null);
  const [modalStage, setModalStage] = useState<number | null>(null);
  const [effects, setEffects] = useState<FloatingEffect[]>([]);
  const [muted, setMuted] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] =
    useState<AppNotificationPermission>(() => getNotificationPermission());
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    () => getNotificationPermission() === 'granted'
  );
  const effectCounterRef = useRef(0);
  const hasNotifiedLowHealthRef = useRef(false);
  const latestHealthRef = useRef(gameState.health);
  const latestStageRef = useRef(gameState.stage);

  latestHealthRef.current = gameState.health;
  latestStageRef.current = gameState.stage;

  const currentPlant = PLANT_TYPES[gameState.currentPlantKey];
  const isWilting = gameState.water < 20 || gameState.sun < 20;

  const computedStatusMessage = isWilting
    ? 'Pokok anda kelihatan layu! Sila siram atau beri cahaya segera.'
    : gameState.stage >= 5
      ? 'Pokok sudah matang sepenuhnya dan disimpan ke dalam koleksi!'
      : customStatus ??
        `Peringkat ${gameState.stage}/5: Pokok ${currentPlant.name} sedang membesar dengan baik.`;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // Ignore storage quota errors
    }
  }, [gameState]);

  // Real-time 10-second environmental decay simulation
  useEffect(() => {
    const timer = window.setInterval(() => {
      setGameState((prev) => {
        if (prev.stage >= 5) return prev;
        const nextWater = Math.max(0, prev.water - 2);
        const nextSun = Math.max(0, prev.sun - 2);
        let nextHealth = prev.health;

        if (nextWater < 20 || nextSun < 20) {
          nextHealth = Math.max(10, nextHealth - 5);
        } else if (nextWater < 30 || nextSun < 30) {
          nextHealth = Math.max(0, nextHealth - 3);
        }

        return {
          ...prev,
          water: nextWater,
          sun: nextSun,
          health: nextHealth,
        };
      });
    }, 10000);

    return () => window.clearInterval(timer);
  }, []);

  const trySendLowHealthAlert = useCallback(
    (health: number, stage: number) => {
      if (stage >= 5 || health >= 30) {
        hasNotifiedLowHealthRef.current = false;
        return;
      }

      if (
        typeof document !== 'undefined' &&
        document.visibilityState !== 'visible' &&
        notificationsEnabled &&
        notificationPermission === 'granted' &&
        !hasNotifiedLowHealthRef.current
      ) {
        const sent = sendLowHealthNotification();
        if (sent) {
          hasNotifiedLowHealthRef.current = true;
        }
      }
    },
    [notificationsEnabled, notificationPermission]
  );

  // Trigger Browser Notification when health < 30% while tab is inactive
  useEffect(() => {
    trySendLowHealthAlert(gameState.health, gameState.stage);
  }, [gameState.health, gameState.stage, trySendLowHealthAlert]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        hasNotifiedLowHealthRef.current = false;
        setNotificationPermission(getNotificationPermission());
      } else {
        trySendLowHealthAlert(
          latestHealthRef.current,
          latestStageRef.current
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trySendLowHealthAlert]);

  const handleToggleNotifications = useCallback(async () => {
    const currentPerm = getNotificationPermission();
    setNotificationPermission(currentPerm);

    if (currentPerm === 'unsupported' || currentPerm === 'denied') {
      return;
    }

    if (currentPerm === 'default') {
      const nextPerm = await requestNotificationPermission();
      setNotificationPermission(nextPerm);
      setNotificationsEnabled(nextPerm === 'granted');
      return;
    }

    setNotificationsEnabled((prev) => !prev);
  }, []);

  const spawnEffect = useCallback((type: CareActionType, label: string) => {
    effectCounterRef.current += 1;
    const id = effectCounterRef.current;
    const xPercent = Math.round(25 + Math.random() * 44);
    const yPercent = Math.round(28 + Math.random() * 28);

    setEffects((prev) => [...prev, { id, type, label, xPercent, yPercent }]);
    window.setTimeout(() => {
      setEffects((prev) => prev.filter((item) => item.id !== id));
    }, 850);
  }, []);

  const handleCareAction = useCallback(
    (action: CareActionType) => {
      if (action === 'plant') {
        playCareSound('plant', muted);
        spawnEffect('plant', 'Benih Ditanam');
        setCustomStatus('Benih baru telah dimasukkan ke dalam pasu!');
        setGameState((prev) => ({
          ...prev,
          stage: 1,
          growthProgress: 0,
          water: 70,
          sun: 70,
          health: 100,
        }));
        return;
      }

      setGameState((prev) => {
        if (prev.stage >= 5) return prev;

        let nextWater = prev.water;
        let nextSun = prev.sun;
        let nextHealth = prev.health;
        let growthGain = 0;

        if (action === 'water') {
          nextWater = Math.min(100, prev.water + 25);
          nextHealth = Math.min(100, prev.health + 10);
          growthGain = 15;
          spawnEffect('water', '+25% Air');
        } else if (action === 'fertilize') {
          nextWater = Math.max(0, prev.water - 10);
          nextSun = Math.max(0, prev.sun - 10);
          nextHealth = Math.min(100, prev.health + 20);
          growthGain = 25;
          spawnEffect('fertilize', '+25% Tumbuh');
        } else if (action === 'sunlight') {
          nextSun = Math.min(100, prev.sun + 25);
          nextWater = Math.max(0, prev.water - 10);
          nextHealth = Math.min(100, prev.health + 10);
          growthGain = 20;
          spawnEffect('sunlight', '+25% Cahaya');
        }

        playCareSound(action, muted);

        let nextGrowth = prev.growthProgress + growthGain;
        let nextStage = prev.stage;
        const nextScore = prev.score + 10;
        let nextCollection = prev.collection;
        let nextHarvestCounts = prev.harvestCounts ?? {};
        const nextBadges = [...prev.badges];

        if (nextScore >= 200 && !nextBadges.includes('Penjaga Setia')) {
          nextBadges.push('Penjaga Setia');
        }

        if (nextGrowth >= 100) {
          nextGrowth = 0;
          if (nextStage < 5) {
            nextStage += 1;
            const plantName = PLANT_TYPES[prev.currentPlantKey].name;

            if (nextStage === 5) {
              if (!nextCollection.includes(plantName)) {
                nextCollection = [...nextCollection, plantName];
              }
              nextHarvestCounts = {
                ...nextHarvestCounts,
                [plantName]: (nextHarvestCounts[plantName] ?? 0) + 1,
              };
              if (
                !nextBadges.includes('Master Penanam') &&
                !nextBadges.includes('Master Penanam 🏅')
              ) {
                nextBadges.push('Master Penanam');
              }
              if (
                nextCollection.length >= Object.keys(PLANT_TYPES).length &&
                !nextBadges.includes('Kolektor Lengkap')
              ) {
                nextBadges.push('Kolektor Lengkap');
              }
            }

            playStageUpSound(nextStage === 5, muted);
            setModalStage(nextStage);
          }
        }

        setCustomStatus(null);

        return {
          ...prev,
          stage: nextStage,
          growthProgress: nextGrowth,
          water: nextWater,
          sun: nextSun,
          health: nextHealth,
          score: nextScore,
          collection: nextCollection,
          harvestCounts: nextHarvestCounts,
          badges: nextBadges,
        };
      });
    },
    [muted, spawnEffect]
  );

  const handleSelectPlant = useCallback(
    (key: PlantKey) => {
      playCareSound('plant', muted);
      setGameState((prev) => ({
        ...prev,
        currentPlantKey: key,
        stage: 1,
        growthProgress: 0,
        water: 60,
        sun: 60,
        health: 100,
      }));
      setCustomStatus(`Benih ${PLANT_TYPES[key].name} ditanam!`);
      setActiveTab('game');
    },
    [muted]
  );

  const handleResetCurrentPot = useCallback(() => {
    setActiveTab('game');
    handleCareAction('plant');
  }, [handleCareAction]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8f4] text-[#1c2920]">
      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="border-b border-[#dde5d7] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#taman"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('game');
            }}
            className="font-display text-xl font-bold tracking-tight text-[#19281e] whitespace-nowrap shrink-0"
          >
            GrowBuddy
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links (Desktop) */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => setActiveTab('game')}
              className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'game'
                  ? 'border-[#1f6e43] text-[#19281e] font-semibold'
                  : 'border-transparent text-[#556a5b] hover:text-[#19281e]'
              }`}
            >
              Taman
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('select')}
              className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'select'
                  ? 'border-[#1f6e43] text-[#19281e] font-semibold'
                  : 'border-transparent text-[#556a5b] hover:text-[#19281e]'
              }`}
            >
              Pilih Benih
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('collection')}
              className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'collection'
                  ? 'border-[#1f6e43] text-[#19281e] font-semibold'
                  : 'border-transparent text-[#556a5b] hover:text-[#19281e]'
              }`}
            >
              Koleksi
            </button>
          </nav>

          {/* Zone 3: Install Prompt + Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <PWAInstallButton />
            <button
              type="button"
              onClick={handleResetCurrentPot}
              className="min-h-[40px] rounded-xl bg-[#1f6e43] hover:bg-[#195a36] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43]"
            >
              Tanam Semula
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 lg:pb-10">
        {activeTab === 'game' && (
          <GardenView
            gameState={gameState}
            currentPlant={currentPlant}
            statusMessage={computedStatusMessage}
            isWilting={isWilting}
            effects={effects}
            muted={muted}
            onToggleMute={() => setMuted((prev) => !prev)}
            notificationPermission={notificationPermission}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={handleToggleNotifications}
            onAction={handleCareAction}
            onGoToSelect={() => setActiveTab('select')}
          />
        )}

        {activeTab === 'select' && (
          <SeedSelectView
            currentPlantKey={gameState.currentPlantKey}
            collection={gameState.collection}
            onSelectPlant={handleSelectPlant}
          />
        )}

        {activeTab === 'collection' && (
          <CollectionView
            gameState={gameState}
            onGoToGarden={() => setActiveTab('game')}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Tab Bar (<= 64px height, <10% mobile viewport) */}
      <nav
        aria-label="Navigasi Bawah"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-[#dde5d7] grid grid-cols-3"
      >
        <button
          type="button"
          onClick={() => setActiveTab('game')}
          className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] cursor-pointer ${
            activeTab === 'game'
              ? 'text-[#1f6e43] font-semibold'
              : 'text-[#5b6e61]'
          }`}
        >
          <Sprout className="w-5 h-5" />
          <span className="text-[11px] leading-tight whitespace-nowrap">
            Taman
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('select')}
          className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] cursor-pointer ${
            activeTab === 'select'
              ? 'text-[#1f6e43] font-semibold'
              : 'text-[#5b6e61]'
          }`}
        >
          <Flower2 className="w-5 h-5" />
          <span className="text-[11px] leading-tight whitespace-nowrap">
            Pilih Benih
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('collection')}
          className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] cursor-pointer ${
            activeTab === 'collection'
              ? 'text-[#1f6e43] font-semibold'
              : 'text-[#5b6e61]'
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[11px] leading-tight whitespace-nowrap">
            Koleksi
          </span>
        </button>
      </nav>

      {/* Stage Progression / Maturity Celebration Modal */}
      <StageModal
        isOpen={modalStage !== null}
        stage={modalStage ?? gameState.stage}
        plant={currentPlant}
        score={gameState.score}
        onClose={() => setModalStage(null)}
        onPlantNew={() => {
          setModalStage(null);
          handleCareAction('plant');
        }}
      />

      <OfflineIndicator />
    </div>
  );
}
