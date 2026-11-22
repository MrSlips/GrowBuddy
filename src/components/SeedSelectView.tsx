import { Check, Sprout } from 'lucide-react';
import { PLANT_TYPES, PlantKey } from '../types/game';
import { PlantArtwork } from './PlantArtwork';

interface SeedSelectViewProps {
  currentPlantKey: PlantKey;
  collection: string[];
  onSelectPlant: (key: PlantKey) => void;
}

export function SeedSelectView({
  currentPlantKey,
  collection,
  onSelectPlant,
}: SeedSelectViewProps) {
  const plants = Object.values(PLANT_TYPES);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#dde5d7] pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#19281e] text-balance">
            Pilih Jenis Benih Pokok
          </h2>
          <p className="text-sm text-[#4f6456] mt-1">
            Pilih spesies kegemaran anda untuk ditanam dan dibesarkan di dalam taman maya.
          </p>
        </div>
        <p className="text-xs font-medium text-[#526859] whitespace-nowrap">
          {plants.length} spesies tersedia · Penjagaan masa nyata
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {plants.map((plant) => {
          const isSelected = plant.key === currentPlantKey;
          const isCollected = collection.includes(plant.name);

          return (
            <article
              key={plant.key}
              className={`rounded-3xl border bg-white p-5 flex flex-col sm:flex-row gap-5 items-stretch transition-colors ${
                isSelected
                  ? 'border-[#1f6e43] bg-[#f8fbf6]'
                  : 'border-[#d6e0cf] hover:border-[#adc0a3]'
              }`}
            >
              <div className="w-full sm:w-36 aspect-square shrink-0 rounded-2xl overflow-hidden border border-[#e3eadf] bg-[#f5f7f2]">
                <PlantArtwork
                  src={plant.imageSrc}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                  fallbackLabel={plant.name}
                />
              </div>

              <div className="flex-1 flex flex-col justify-between gap-4 min-w-0">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#546a5b] truncate">
                      {plant.scientificName}
                      {isCollected ? ' · Sudah Dituai' : ''}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#19281e] leading-snug">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-[#46594c] leading-relaxed">
                    {plant.desc}
                  </p>
                  <p className="text-xs text-[#5d7163] pt-0.5">
                    {plant.climate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlant(plant.key)}
                  className={`min-h-[44px] w-full sm:w-auto self-start rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43] ${
                    isSelected
                      ? 'bg-[#e6f2ea] text-[#185835] border border-[#b4d6bf] hover:bg-[#d8ebde]'
                      : 'bg-[#1f6e43] text-white hover:bg-[#195a36]'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Dipilih · Tanam Semula</span>
                    </>
                  ) : (
                    <>
                      <Sprout className="w-4 h-4 shrink-0" />
                      <span>Pilih Benih</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
