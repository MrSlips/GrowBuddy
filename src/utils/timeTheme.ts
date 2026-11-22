export type TimePeriod = 'pagi' | 'tengah_hari' | 'senja' | 'malam';

export interface GardenTimeTheme {
  period: TimePeriod;
  label: string;
  isDark: boolean;
  gardenContainerClass: string;
  cardClass: string;
  dividerClass: string;
  headingTextClass: string;
  bodyTextClass: string;
  mutedTextClass: string;
  scoreTextClass: string;
  stageShellClass: string;
  stageScrimClass: string;
  stageBackdropOpacityClass: string;
  stageStatusNormalClass: string;
  stageStatusWiltingClass: string;
  trackBgClass: string;
  waterTrackClass: string;
  sunTrackClass: string;
  healthTrackClass: string;
  iconBtnClass: string;
  secondaryLinkClass: string;
}

export function getTimePeriodFromHour(hour: number): TimePeriod {
  if (hour >= 6 && hour < 12) return 'pagi';
  if (hour >= 12 && hour < 17) return 'tengah_hari';
  if (hour >= 17 && hour < 19) return 'senja';
  return 'malam';
}

export function getGardenTimeTheme(date: Date = new Date()): GardenTimeTheme {
  const period = getTimePeriodFromHour(date.getHours());

  switch (period) {
    case 'pagi':
      return {
        period,
        label: 'Suasana Pagi',
        isDark: false,
        gardenContainerClass: 'bg-[#edf4ea] border border-[#d6e2d0]',
        cardClass: 'bg-white border-[#d6e0cf]',
        dividerClass: 'border-[#eef2ea]',
        headingTextClass: 'text-[#19281e]',
        bodyTextClass: 'text-[#43584a]',
        mutedTextClass: 'text-[#556a5b]',
        scoreTextClass: 'text-[#1f6e43]',
        stageShellClass: 'border-[#d6e0cf] bg-[#eaf1e5]',
        stageScrimClass:
          'bg-gradient-to-b from-[#f8faf5]/75 via-[#f4f7f0]/45 to-[#ebe4d7]/90',
        stageBackdropOpacityClass: 'opacity-45',
        stageStatusNormalClass:
          'bg-white/90 border-[#d6e0cf] text-[#1f3326]',
        stageStatusWiltingClass:
          'bg-[#fef2f2]/95 border-[#fecaca] text-[#991b1b]',
        trackBgClass: 'bg-[#e4ebe0]',
        waterTrackClass: 'bg-[#e6eef2]',
        sunTrackClass: 'bg-[#f3ede2]',
        healthTrackClass: 'bg-[#e8f0e6]',
        iconBtnClass:
          'border-[#cbd7c4] bg-white/85 text-[#2b4232] hover:bg-white',
        secondaryLinkClass: 'text-[#1f6e43]',
      };

    case 'tengah_hari':
      return {
        period,
        label: 'Suasana Tengah Hari',
        isDark: false,
        gardenContainerClass: 'bg-[#f5f1e3] border border-[#e3dcc8]',
        cardClass: 'bg-[#fffefb] border-[#e2dac6]',
        dividerClass: 'border-[#f0eadc]',
        headingTextClass: 'text-[#21251b]',
        bodyTextClass: 'text-[#4f5242]',
        mutedTextClass: 'text-[#636654]',
        scoreTextClass: 'text-[#1f6e43]',
        stageShellClass: 'border-[#e0d8c3] bg-[#f2ecdb]',
        stageScrimClass:
          'bg-gradient-to-b from-[#fffbeb]/70 via-[#faf5e6]/45 to-[#e9dec8]/90',
        stageBackdropOpacityClass: 'opacity-50',
        stageStatusNormalClass:
          'bg-[#fffefb]/92 border-[#e2dac6] text-[#23291d]',
        stageStatusWiltingClass:
          'bg-[#fef2f2]/95 border-[#fecaca] text-[#991b1b]',
        trackBgClass: 'bg-[#ebe4d2]',
        waterTrackClass: 'bg-[#e4edf1]',
        sunTrackClass: 'bg-[#f2e8d4]',
        healthTrackClass: 'bg-[#e7efe3]',
        iconBtnClass:
          'border-[#d8cfb9] bg-[#fffefb]/85 text-[#363a2a] hover:bg-white',
        secondaryLinkClass: 'text-[#1f6e43]',
      };

    case 'senja':
      return {
        period,
        label: 'Suasana Senja',
        isDark: false,
        gardenContainerClass: 'bg-[#eae1d5] border border-[#d6c9b8]',
        cardClass: 'bg-[#fcf9f4] border-[#d8cbb9]',
        dividerClass: 'border-[#eee5d8]',
        headingTextClass: 'text-[#26201b]',
        bodyTextClass: 'text-[#54473d]',
        mutedTextClass: 'text-[#695a4f]',
        scoreTextClass: 'text-[#1f6e43]',
        stageShellClass: 'border-[#d6c8b6] bg-[#e6dacb]',
        stageScrimClass:
          'bg-gradient-to-b from-[#f8e7d3]/70 via-[#efe1d1]/50 to-[#d9cab8]/92',
        stageBackdropOpacityClass: 'opacity-40',
        stageStatusNormalClass:
          'bg-[#fcf9f4]/92 border-[#d8cbb9] text-[#28221c]',
        stageStatusWiltingClass:
          'bg-[#fef2f2]/95 border-[#fecaca] text-[#991b1b]',
        trackBgClass: 'bg-[#e6dbcd]',
        waterTrackClass: 'bg-[#e2eaee]',
        sunTrackClass: 'bg-[#efe2ce]',
        healthTrackClass: 'bg-[#e4ece0]',
        iconBtnClass:
          'border-[#ccbda9] bg-[#fcf9f4]/85 text-[#3b3129] hover:bg-white',
        secondaryLinkClass: 'text-[#1f6e43]',
      };

    case 'malam':
      return {
        period,
        label: 'Suasana Malam',
        isDark: true,
        gardenContainerClass: 'bg-[#121c16] border border-[#25382c]',
        cardClass: 'bg-[#1a2820] border-[#2c4234]',
        dividerClass: 'border-[#273a2e]',
        headingTextClass: 'text-[#f0f6f1]',
        bodyTextClass: 'text-[#c3d3c8]',
        mutedTextClass: 'text-[#9ab0a1]',
        scoreTextClass: 'text-[#6ee7a0]',
        stageShellClass: 'border-[#2c4234] bg-[#16221b]',
        stageScrimClass:
          'bg-gradient-to-b from-[#0b1410]/85 via-[#13211a]/70 to-[#0e1712]/92',
        stageBackdropOpacityClass: 'opacity-25',
        stageStatusNormalClass:
          'bg-[#142019]/92 border-[#2e4537] text-[#eef5f0]',
        stageStatusWiltingClass:
          'bg-[#3b1818]/95 border-[#7f1d1d] text-[#fecaca]',
        trackBgClass: 'bg-[#26392e]',
        waterTrackClass: 'bg-[#1d323d]',
        sunTrackClass: 'bg-[#362d1c]',
        healthTrackClass: 'bg-[#1f3626]',
        iconBtnClass:
          'border-[#334d3d] bg-[#1d2d24]/90 text-[#dce8df] hover:bg-[#24372c]',
        secondaryLinkClass: 'text-[#6ee7a0]',
      };
  }
}

export function formatLocalTime(date: Date): string {
  return date.toLocaleTimeString('ms-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
