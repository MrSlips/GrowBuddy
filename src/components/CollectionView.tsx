import { Award, CheckCircle2, Lock, Sprout } from 'lucide-react';
import {
  BADGE_CATALOG,
  GameState,
  PLANT_TYPES,
  PlantSpec,
} from '../types/game';
import { PlantArtwork } from './PlantArtwork';

interface CollectionViewProps {
  gameState: GameState;
  onGoToGarden: () => void;
}

function findPlantByName(name: string): PlantSpec | undefined {
  return Object.values(PLANT_TYPES).find((p) => p.name === name);
}

export function CollectionView({
  gameState,
  onGoToGarden,
}: CollectionViewProps) {
  const unlockedCount = BADGE_CATALOG.filter((badge) =>
    badge.legacyMatches.some((m) => gameState.badges.includes(m))
  ).length;

  return (
    <div className="space-y-8">
      {/* Header & Summary Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dde5d7] pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#19281e] text-balance">
            Koleksi &amp; Lencana Anda
          </h2>
          <p className="text-sm text-[#4f6456] mt-1">
            Rekod pokok matang yang berjaya dituai serta pencapaian penjagaan taman anda.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-2 md:pt-0">
          <div>
            <span className="text-xs text-[#556a5b] block">Mata Taman</span>
            <span className="font-mono-nums text-xl sm:text-2xl font-semibold text-[#19281e]">
              {gameState.score}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#556a5b] block">Pokok Matang</span>
            <span className="font-mono-nums text-xl sm:text-2xl font-semibold text-[#1f6e43]">
              {gameState.collection.length}/{Object.keys(PLANT_TYPES).length}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#556a5b] block">Lencana</span>
            <span className="font-mono-nums text-xl sm:text-2xl font-semibold text-[#d97706]">
              {unlockedCount}/{BADGE_CATALOG.length}
            </span>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <section aria-label="Lencana Diperolehi" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#19281e]">
            Lencana Pencapaian
          </h3>
          <span className="text-xs text-[#556a5b] font-mono-nums">
            {unlockedCount} daripada {BADGE_CATALOG.length} dibuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGE_CATALOG.map((badge) => {
            const isUnlocked = badge.legacyMatches.some((m) =>
              gameState.badges.includes(m)
            );
            return (
              <div
                key={badge.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 ${
                  isUnlocked
                    ? 'bg-white border-[#b7d4be]'
                    : 'bg-[#eff3ec] border-[#dce4d7] opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-[#e6f2ea] text-[#1f6e43]'
                        : 'bg-[#e1e7dc] text-[#6d7e72]'
                    }`}
                  >
                    {isUnlocked ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isUnlocked ? 'text-[#1f6e43]' : 'text-[#647569]'
                    }`}
                  >
                    {isUnlocked ? 'Diperolehi' : 'Terkunci'}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#19281e]">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-[#516457] mt-1 leading-relaxed">
                    {badge.requirement}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Matured Plants Collection */}
      <section aria-label="Pokok Matang Disimpan" className="space-y-4">
        <h3 className="text-lg font-bold text-[#19281e]">
          Pokok Matang Disimpan
        </h3>

        {gameState.collection.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#c7d5bf] bg-white p-8 sm:p-10 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#edf4ea] text-[#1f6e43] flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <div className="max-w-md space-y-1">
              <h4 className="text-base font-bold text-[#19281e]">
                Belum ada pokok matang dalam koleksi
              </h4>
              <p className="text-sm text-[#556a5b]">
                Siram, baja, dan beri cahaya secukupnya di Taman sehingga pokok anda mencapai peringkat 5.
              </p>
            </div>
            <button
              type="button"
              onClick={onGoToGarden}
              className="mt-2 min-h-[44px] rounded-xl bg-[#1f6e43] hover:bg-[#195a36] text-white text-sm font-semibold px-5 py-2.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              Pergi ke Taman
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gameState.collection.map((plantName) => {
              const spec = findPlantByName(plantName);
              const count = gameState.harvestCounts?.[plantName] ?? 1;

              return (
                <article
                  key={plantName}
                  className="rounded-3xl border border-[#d6e0cf] bg-white overflow-hidden flex flex-col"
                >
                  <div className="aspect-square w-full bg-[#f5f7f2] border-b border-[#eef2ea]">
                    {spec ? (
                      <PlantArtwork
                        src={spec.imageSrc}
                        alt={plantName}
                        className="w-full h-full object-cover"
                        fallbackLabel={plantName}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#1f6e43]">
                        <Sprout className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-[#19281e] truncate">
                        {plantName}
                      </h4>
                      <CheckCircle2
                        className="w-4 h-4 text-[#1f6e43] shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs text-[#516457]">
                      Berjaya Ditanam ·{' '}
                      <span className="font-mono-nums font-semibold">
                        {count}x dituai
                      </span>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
