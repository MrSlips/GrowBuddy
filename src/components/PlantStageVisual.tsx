import { useState } from 'react';
import {
  Bell,
  BellOff,
  Droplets,
  Leaf,
  Moon,
  Sprout,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  FloatingEffect,
  GREENHOUSE_BACKDROP_SRC,
  PlantSpec,
  STAGE_LABELS,
} from '../types/game';
import { AppNotificationPermission } from '../utils/notifications';
import { GardenTimeTheme } from '../utils/timeTheme';
import { PlantArtwork } from './PlantArtwork';

interface PlantStageVisualProps {
  plant: PlantSpec;
  stage: number;
  growthProgress: number;
  water: number;
  sun: number;
  health: number;
  statusMessage: string;
  isWilting: boolean;
  effects: FloatingEffect[];
  muted: boolean;
  onToggleMute: () => void;
  notificationPermission: AppNotificationPermission;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  timeTheme: GardenTimeTheme;
  formattedTime: string;
}

function PlantGrowthIllustration({
  plantKey,
  stage,
  isWilting,
}: {
  plantKey: PlantSpec['key'];
  stage: number;
  isWilting: boolean;
}) {
  const leafFill = isWilting ? '#849b6c' : '#3a8c4e';
  const leafDark = isWilting ? '#657a50' : '#256637';
  const stemStroke = isWilting ? '#6b8255' : '#2d723e';

  return (
    <svg
      viewBox="0 0 220 220"
      className={`w-48 h-48 sm:w-56 sm:h-56 drop-shadow-sm transition-transform duration-300 ${
        isWilting ? 'rotate-2 opacity-90' : 'animate-plant-sway'
      }`}
      aria-hidden="true"
    >
      {/* Terracotta Pot */}
      <ellipse cx="110" cy="196" rx="54" ry="8" fill="#3a2a1e" opacity="0.16" />
      <path
        d="M68 152 L152 152 L142 194 C141 197 137 199 133 199 L87 199 C83 199 79 197 78 194 Z"
        fill="#b86642"
        stroke="#7e3f24"
        strokeWidth="2.5"
      />
      <rect
        x="62"
        y="141"
        width="96"
        height="13"
        rx="4"
        fill="#ca754e"
        stroke="#7e3f24"
        strokeWidth="2.5"
      />
      {/* Rich Soil */}
      <ellipse cx="110" cy="141" rx="41" ry="6" fill="#4f3524" />
      <path
        d="M84 141 Q110 132 136 141"
        fill="#5f422e"
      />

      {/* Stage 1: Biji Benih */}
      {stage === 1 && (
        <g>
          <ellipse
            cx="110"
            cy="137"
            rx="11"
            ry="7.5"
            transform="rotate(-14 110 137)"
            fill={plantKey === 'sunflower' ? '#574234' : '#9c6f3e'}
            stroke="#3d2817"
            strokeWidth="2"
          />
          <path
            d="M103 137 Q110 133 117 137"
            fill="none"
            stroke="#e8d8c3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M110 129 C110 123, 114 120, 116 118"
            fill="none"
            stroke="#5ea35e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Stage 2: Bercambah */}
      {stage === 2 && (
        <g>
          <path
            d="M110 140 Q109 122 110 110"
            fill="none"
            stroke={stemStroke}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M110 114 C96 105, 86 109, 92 120 C98 126, 108 119, 110 114 Z"
            fill={leafFill}
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M110 112 C124 103, 134 107, 128 118 C122 124, 112 117, 110 112 Z"
            fill={leafFill}
            stroke={leafDark}
            strokeWidth="2"
          />
        </g>
      )}

      {/* Stage 3: Anak Pokok */}
      {stage === 3 && (
        <g>
          <path
            d="M110 140 Q107 112 110 82"
            fill="none"
            stroke={stemStroke}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Lower leaves */}
          <path
            d="M109 120 C88 108, 74 114, 82 128 C91 135, 104 126, 109 120 Z"
            fill={leafFill}
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M110 116 C132 104, 145 111, 137 125 C128 131, 115 123, 110 116 Z"
            fill={leafFill}
            stroke={leafDark}
            strokeWidth="2"
          />
          {/* Upper leaves */}
          <path
            d="M110 95 C92 81, 82 88, 90 100 C97 105, 107 99, 110 95 Z"
            fill="#4da362"
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M110 93 C128 79, 138 86, 130 98 C123 103, 113 97, 110 93 Z"
            fill="#4da362"
            stroke={leafDark}
            strokeWidth="2"
          />
          <ellipse
            cx="110"
            cy="79"
            rx="6"
            ry="9"
            fill="#66bb6a"
            stroke={leafDark}
            strokeWidth="2"
          />
        </g>
      )}

      {/* Stage 4: Membesar */}
      {stage === 4 && (
        <g>
          <path
            d="M110 140 Q106 102 110 58"
            fill="none"
            stroke={stemStroke}
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Secondary branches */}
          <path
            d="M109 108 Q90 96 80 86"
            fill="none"
            stroke={stemStroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M110 102 Q130 90 140 80"
            fill="none"
            stroke={stemStroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Foliage */}
          <path
            d="M108 122 C82 110, 68 118, 78 132 C89 138, 102 128, 108 122 Z"
            fill={leafFill}
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M111 118 C138 106, 152 115, 141 129 C131 135, 118 125, 111 118 Z"
            fill={leafFill}
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M84 89 C66 77, 58 86, 68 97 C76 102, 83 94, 84 89 Z"
            fill="#4da362"
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M136 83 C154 71, 162 80, 152 91 C144 96, 137 88, 136 83 Z"
            fill="#4da362"
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M109 76 C89 63, 81 71, 90 83 C98 87, 106 81, 109 76 Z"
            fill="#56b36b"
            stroke={leafDark}
            strokeWidth="2"
          />
          <path
            d="M111 74 C131 61, 139 69, 130 81 C122 85, 114 79, 111 74 Z"
            fill="#56b36b"
            stroke={leafDark}
            strokeWidth="2"
          />

          {/* Species-specific buds */}
          {plantKey === 'sunflower' && (
            <g>
              <circle
                cx="110"
                cy="52"
                r="13"
                fill="#eab308"
                stroke="#854d0e"
                strokeWidth="2"
              />
              <circle cx="110" cy="52" r="7" fill="#713f12" />
            </g>
          )}
          {plantKey === 'chili' && (
            <g>
              <circle cx="80" cy="84" r="4.5" fill="#fffbeb" stroke={leafDark} strokeWidth="1.5" />
              <circle cx="140" cy="78" r="4.5" fill="#fffbeb" stroke={leafDark} strokeWidth="1.5" />
              <path d="M110 56 C114 66, 113 74, 109 78 C106 73, 106 65, 110 56 Z" fill="#65a30d" stroke={leafDark} strokeWidth="1.5" />
            </g>
          )}
          {plantKey === 'tomato' && (
            <g>
              <circle cx="84" cy="96" r="6" fill="#84cc16" stroke={leafDark} strokeWidth="1.8" />
              <circle cx="136" cy="90" r="5.5" fill="#eab308" stroke={leafDark} strokeWidth="1.8" />
              <circle cx="110" cy="54" r="5" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
            </g>
          )}
          {plantKey === 'mango' && (
            <g>
              <ellipse cx="110" cy="54" rx="16" ry="12" fill="#3a8c4e" stroke={leafDark} strokeWidth="2" />
              <ellipse cx="94" cy="62" rx="12" ry="9" fill="#4da362" stroke={leafDark} strokeWidth="2" />
              <ellipse cx="126" cy="62" rx="12" ry="9" fill="#4da362" stroke={leafDark} strokeWidth="2" />
            </g>
          )}
          {plantKey === 'strawberry' && (
            <g>
              <circle cx="80" cy="84" r="5" fill="#ffffff" stroke={leafDark} strokeWidth="1.5" />
              <circle cx="80" cy="84" r="2" fill="#facc15" />
              <circle cx="140" cy="78" r="5" fill="#ffffff" stroke={leafDark} strokeWidth="1.5" />
              <circle cx="140" cy="78" r="2" fill="#facc15" />
              <path d="M110 55 C115 55, 117 65, 110 70 C103 65, 105 55, 110 55 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            </g>
          )}
          {plantKey === 'orchid' && (
            <g>
              <circle cx="102" cy="56" r="7" fill="#f0abfc" stroke="#86198f" strokeWidth="1.5" />
              <circle cx="118" cy="52" r="7" fill="#f5d0fe" stroke="#86198f" strokeWidth="1.5" />
              <circle cx="110" cy="48" r="5" fill="#fef08a" stroke="#a21caf" strokeWidth="1.5" />
            </g>
          )}
          {plantKey === 'cactus' && (
            <g>
              <ellipse cx="110" cy="116" rx="22" ry="26" fill="#4d7c0f" stroke="#365314" strokeWidth="2" />
              <circle cx="110" cy="88" r="6.5" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
              <circle cx="102" cy="92" r="4.5" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
              <circle cx="118" cy="92" r="4.5" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
            </g>
          )}
          {plantKey === 'pandan' && (
            <g>
              <path d="M110 132 Q86 92 68 74" fill="none" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
              <path d="M110 132 Q134 92 152 74" fill="none" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
              <path d="M110 132 Q98 84 94 52" fill="none" stroke="#22c55e" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M110 132 Q122 84 126 52" fill="none" stroke="#22c55e" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

export function PlantStageVisual({
  plant,
  stage,
  growthProgress,
  water,
  sun,
  health,
  statusMessage,
  isWilting,
  effects,
  muted,
  onToggleMute,
  notificationPermission,
  notificationsEnabled,
  onToggleNotifications,
  timeTheme,
  formattedTime,
}: PlantStageVisualProps) {
  const [backdropError, setBackdropError] = useState(false);
  const stageInfo = STAGE_LABELS[stage] || STAGE_LABELS[1];

  const isNotifActive =
    notificationPermission === 'granted' && notificationsEnabled;
  const notifLabel =
    notificationPermission === 'unsupported'
      ? 'Notifikasi pelayar tidak disokong'
      : notificationPermission === 'denied'
        ? 'Notifikasi disekat oleh pelayar'
        : isNotifActive
          ? 'Matikan notifikasi amaran'
          : 'Aktifkan notifikasi amaran';

  return (
    <section
      aria-label="Pentas Penjagaan Pokok"
      className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-colors duration-500 min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] ${timeTheme.stageShellClass}`}
    >
      {/* Greenhouse Conservatory Backdrop */}
      {!backdropError ? (
        <img
          src={GREENHOUSE_BACKDROP_SRC}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBackdropError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none transition-opacity duration-500 ${timeTheme.stageBackdropOpacityClass}`}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none ${
            timeTheme.isDark
              ? 'bg-gradient-to-b from-[#0d1611] via-[#132018] to-[#19281f]'
              : 'bg-gradient-to-b from-[#e8f2ea] via-[#f2f6ee] to-[#dfd5c7]'
          }`}
        />
      )}

      {/* Measured atmospheric overlay */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${timeTheme.stageScrimClass}`}
      />

      {/* Top Stage Info Strip */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <p className={`text-xs font-medium truncate ${timeTheme.mutedTextClass}`}>
            {plant.scientificName} · {plant.climate}
          </p>
          <h2 className={`text-lg sm:text-xl font-bold truncate ${timeTheme.headingTextClass}`}>
            {plant.name}
          </h2>
          <p className={`text-xs mt-0.5 flex items-center gap-1.5 font-mono-nums ${timeTheme.mutedTextClass}`}>
            {timeTheme.isDark ? (
              <Moon className="w-3.5 h-3.5 text-[#93c5fd] shrink-0" aria-hidden="true" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#d97706] shrink-0" aria-hidden="true" />
            )}
            <span>
              {timeTheme.label} · {formattedTime}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {notificationPermission !== 'unsupported' && (
            <button
              type="button"
              onClick={onToggleNotifications}
              disabled={notificationPermission === 'denied'}
              aria-label={notifLabel}
              title={notifLabel}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43] shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${timeTheme.iconBtnClass}`}
            >
              {isNotifActive ? (
                <Bell className="w-4 h-4 text-[#16a34a]" />
              ) : (
                <BellOff className="w-4 h-4" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Hidupkan bunyi' : 'Senyapkan bunyi'}
            title={muted ? 'Hidupkan bunyi' : 'Senyapkan bunyi'}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43] shrink-0 cursor-pointer ${timeTheme.iconBtnClass}`}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Central Botanical Showcase */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4">
        {stage >= 5 ? (
          <div className="relative flex flex-col items-center">
            <div
              className={`w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 shadow-sm animate-plant-sway ${
                timeTheme.isDark
                  ? 'border-[#334e3d] bg-[#1b2920]'
                  : 'border-[#c7d6bf] bg-[#f8faf5]'
              }`}
            >
              <PlantArtwork
                src={plant.imageSrc}
                alt={`${plant.name} matang sepenuhnya`}
                className="w-full h-full object-cover"
                fallbackLabel={plant.name}
              />
            </div>
          </div>
        ) : (
          <PlantGrowthIllustration
            plantKey={plant.key}
            stage={stage}
            isWilting={isWilting}
          />
        )}

        {/* Floating Action Effects */}
        {effects.map((fx) => (
          <div
            key={fx.id}
            style={{ left: `${fx.xPercent}%`, top: `${fx.yPercent}%` }}
            className="absolute z-20 pointer-events-none flex items-center gap-1.5 rounded-xl bg-white/95 border border-[#d6e0cf] px-2.5 py-1.5 shadow-sm text-xs font-semibold text-[#1f3326] animate-action-float"
          >
            {fx.type === 'water' && <Droplets className="w-4 h-4 text-[#0284c7]" />}
            {fx.type === 'fertilize' && <Leaf className="w-4 h-4 text-[#15803d]" />}
            {fx.type === 'sunlight' && <Sun className="w-4 h-4 text-[#d97706]" />}
            {fx.type === 'plant' && <Sprout className="w-4 h-4 text-[#1f6e43]" />}
            <span>{fx.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Status & Stage Progress Footer inside Stage */}
      <div className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-5">
        <div
          className={`rounded-2xl border px-4 py-3 backdrop-blur-sm transition-colors ${
            isWilting
              ? timeTheme.stageStatusWiltingClass
              : timeTheme.stageStatusNormalClass
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold">
              Peringkat {stage}/5 · {stageInfo.title}
            </span>
            <span
              className={`font-mono-nums text-xs ${
                isWilting
                  ? timeTheme.isDark
                    ? 'text-[#fca5a5]'
                    : 'text-[#b91c1c]'
                  : timeTheme.mutedTextClass
              }`}
            >
              {stage >= 5 ? '100% Matang' : `${growthProgress}% ke peringkat seterusnya`}
            </span>
          </div>
          <div
            className={`w-full h-2 rounded-full overflow-hidden mb-2 ${timeTheme.trackBgClass}`}
            role="progressbar"
            aria-valuenow={stage >= 5 ? 100 : growthProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Kemajuan pertumbuhan peringkat"
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                timeTheme.isDark ? 'bg-[#4ade80]' : 'bg-[#1f6e43]'
              }`}
              style={{ width: `${stage >= 5 ? 100 : growthProgress}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm font-medium leading-snug">
            {statusMessage}
          </p>
          <p className="sr-only">
            Air {water} peratus, Cahaya {sun} peratus, Kesihatan {health} peratus.
          </p>
        </div>
      </div>
    </section>
  );
}
