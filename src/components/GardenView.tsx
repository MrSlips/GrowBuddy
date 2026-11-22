import { useEffect, useState } from 'react';
import { Droplets, HeartPulse, Leaf, Sprout, Sun } from 'lucide-react';
import {
  CareActionType,
  FloatingEffect,
  GameState,
  PlantSpec,
  STAGE_LABELS,
} from '../types/game';
import { AppNotificationPermission } from '../utils/notifications';
import { formatLocalTime, getGardenTimeTheme } from '../utils/timeTheme';
import { PlantStageVisual } from './PlantStageVisual';

interface GardenViewProps {
  gameState: GameState;
  currentPlant: PlantSpec;
  statusMessage: string;
  isWilting: boolean;
  effects: FloatingEffect[];
  muted: boolean;
  onToggleMute: () => void;
  notificationPermission: AppNotificationPermission;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onAction: (action: CareActionType) => void;
  onGoToSelect: () => void;
}

function getMetricLabel(value: number, lowThreshold = 20): string {
  if (value < lowThreshold) return 'Kritikal';
  if (value < 45) return 'Rendah';
  if (value >= 75) return 'Optimum';
  return 'Baik';
}

export function GardenView({
  gameState,
  currentPlant,
  statusMessage,
  isWilting,
  effects,
  muted,
  onToggleMute,
  notificationPermission,
  notificationsEnabled,
  onToggleNotifications,
  onAction,
  onGoToSelect,
}: GardenViewProps) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  const timeTheme = getGardenTimeTheme(now);
  const formattedTime = formatLocalTime(now);
  const isMature = gameState.stage >= 5;
  const stageInfo = STAGE_LABELS[gameState.stage] || STAGE_LABELS[1];

  return (
    <div
      data-time-period={timeTheme.period}
      className={`rounded-3xl p-4 sm:p-6 transition-colors duration-500 ${timeTheme.gardenContainerClass}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        {/* Left Focal Anchor: Greenhouse Stage */}
        <div className="lg:col-span-7 flex flex-col">
          <PlantStageVisual
            plant={currentPlant}
            stage={gameState.stage}
            growthProgress={gameState.growthProgress}
            water={gameState.water}
            sun={gameState.sun}
            health={gameState.health}
            statusMessage={statusMessage}
            isWilting={isWilting}
            effects={effects}
            muted={muted}
            onToggleMute={onToggleMute}
            notificationPermission={notificationPermission}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={onToggleNotifications}
            timeTheme={timeTheme}
            formattedTime={formattedTime}
          />
        </div>

        {/* Right Column: Live Care HUD & Action Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          {/* Live Telemetry & Care Meters */}
          <section
            aria-label="Status Penjagaan Pokok"
            className={`rounded-3xl border p-5 sm:p-6 flex flex-col gap-5 transition-colors duration-500 ${timeTheme.cardClass}`}
          >
            <div
              className={`flex items-baseline justify-between gap-4 border-b pb-4 ${timeTheme.dividerClass}`}
            >
              <div>
                <p className={`text-xs font-medium ${timeTheme.mutedTextClass}`}>
                  Statistik Semasa · {timeTheme.label}
                </p>
                <h3 className={`text-lg font-bold ${timeTheme.headingTextClass}`}>
                  Keseimbangan Taman
                </h3>
              </div>
              <div className="text-right">
                <span className={`text-xs block ${timeTheme.mutedTextClass}`}>
                  Jumlah Mata
                </span>
                <span
                  className={`font-mono-nums text-2xl font-semibold ${timeTheme.scoreTextClass}`}
                >
                  {gameState.score}
                </span>
              </div>
            </div>

            {/* Water Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`flex items-center gap-2 font-semibold ${timeTheme.headingTextClass}`}
                >
                  <Droplets className="w-4 h-4 text-[#0284c7]" />
                  <span>Air</span>
                </span>
                <span
                  className={`font-mono-nums text-xs sm:text-sm ${timeTheme.bodyTextClass}`}
                >
                  {gameState.water}% · {getMetricLabel(gameState.water)}
                </span>
              </div>
              <div
                className={`h-2.5 w-full rounded-full overflow-hidden ${timeTheme.waterTrackClass}`}
                role="progressbar"
                aria-valuenow={gameState.water}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Tahap air"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    gameState.water < 20
                      ? 'bg-[#ef4444]'
                      : timeTheme.isDark
                        ? 'bg-[#38bdf8]'
                        : 'bg-[#0284c7]'
                  }`}
                  style={{ width: `${gameState.water}%` }}
                />
              </div>
            </div>

            {/* Sunlight Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`flex items-center gap-2 font-semibold ${timeTheme.headingTextClass}`}
                >
                  <Sun className="w-4 h-4 text-[#d97706]" />
                  <span>Cahaya</span>
                </span>
                <span
                  className={`font-mono-nums text-xs sm:text-sm ${timeTheme.bodyTextClass}`}
                >
                  {gameState.sun}% · {getMetricLabel(gameState.sun)}
                </span>
              </div>
              <div
                className={`h-2.5 w-full rounded-full overflow-hidden ${timeTheme.sunTrackClass}`}
                role="progressbar"
                aria-valuenow={gameState.sun}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Tahap cahaya matahari"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    gameState.sun < 20
                      ? 'bg-[#ef4444]'
                      : timeTheme.isDark
                        ? 'bg-[#fbbf24]'
                        : 'bg-[#f59e0b]'
                  }`}
                  style={{ width: `${gameState.sun}%` }}
                />
              </div>
            </div>

            {/* Health Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`flex items-center gap-2 font-semibold ${timeTheme.headingTextClass}`}
                >
                  <HeartPulse className="w-4 h-4 text-[#16a34a]" />
                  <span>Sihat</span>
                </span>
                <span
                  className={`font-mono-nums text-xs sm:text-sm ${timeTheme.bodyTextClass}`}
                >
                  {gameState.health}% · {getMetricLabel(gameState.health, 35)}
                </span>
              </div>
              <div
                className={`h-2.5 w-full rounded-full overflow-hidden ${timeTheme.healthTrackClass}`}
                role="progressbar"
                aria-valuenow={gameState.health}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Tahap kesihatan pokok"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    gameState.health < 35
                      ? 'bg-[#ef4444]'
                      : timeTheme.isDark
                        ? 'bg-[#4ade80]'
                        : 'bg-[#16a34a]'
                  }`}
                  style={{ width: `${gameState.health}%` }}
                />
              </div>
            </div>

            {/* Botanical Care Note */}
            <div
              className={`pt-2 border-t text-xs leading-relaxed ${timeTheme.dividerClass} ${timeTheme.mutedTextClass}`}
            >
              <p className={`font-semibold mb-0.5 ${timeTheme.headingTextClass}`}>
                Nota Penjagaan · {stageInfo.title}
              </p>
              <p>{currentPlant.careNote}</p>
            </div>
          </section>

          {/* Action Deck (2x2 Thumb-Ergonomic Grid) */}
          <section
            aria-label="Tindakan Penjagaan"
            className={`rounded-3xl border p-5 sm:p-6 flex flex-col gap-3.5 transition-colors duration-500 ${timeTheme.cardClass}`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-base font-bold ${timeTheme.headingTextClass}`}>
                Tindakan Harian
              </h3>
              <button
                type="button"
                onClick={onGoToSelect}
                className={`text-xs font-semibold hover:underline whitespace-nowrap shrink-0 min-h-[40px] px-2 flex items-center cursor-pointer ${timeTheme.secondaryLinkClass}`}
              >
                Tukar Benih
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onAction('plant')}
                className="min-h-[52px] rounded-2xl bg-[#1f6e43] hover:bg-[#195a36] active:scale-[0.98] text-white font-semibold text-sm px-4 py-3 flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43] whitespace-nowrap cursor-pointer"
              >
                <Sprout className="w-4 h-4 shrink-0" />
                <span>TANAM</span>
              </button>

              <button
                type="button"
                onClick={() => onAction('water')}
                disabled={isMature}
                className="min-h-[52px] rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] disabled:bg-[#334155]/40 disabled:text-[#94a3b8] disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-sm px-4 py-3 flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7] whitespace-nowrap cursor-pointer"
              >
                <Droplets className="w-4 h-4 shrink-0" />
                <span>SIRAM</span>
              </button>

              <button
                type="button"
                onClick={() => onAction('fertilize')}
                disabled={isMature}
                className="min-h-[52px] rounded-2xl bg-[#d97706] hover:bg-[#b45309] disabled:bg-[#334155]/40 disabled:text-[#94a3b8] disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-sm px-4 py-3 flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97706] whitespace-nowrap cursor-pointer"
              >
                <Leaf className="w-4 h-4 shrink-0" />
                <span>BAJA</span>
              </button>

              <button
                type="button"
                onClick={() => onAction('sunlight')}
                disabled={isMature}
                className="min-h-[52px] rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] disabled:bg-[#334155]/40 disabled:text-[#94a3b8] disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-sm px-4 py-3 flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ea580c] whitespace-nowrap cursor-pointer"
              >
                <Sun className="w-4 h-4 shrink-0" />
                <span>CAHAYA</span>
              </button>
            </div>

            {isMature && (
              <p className={`text-xs pt-1 ${timeTheme.mutedTextClass}`}>
                Pokok ini sudah matang sepenuhnya. Tekan <strong>TANAM</strong> atau{' '}
                <strong>Tukar Benih</strong> untuk menanam pokok baharu.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
