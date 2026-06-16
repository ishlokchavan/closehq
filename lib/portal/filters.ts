/**
 * Single source of truth for every filter dropdown value used across the app
 * (Properties, New Releases, Transactions, Agents). Values are config-driven by
 * default and overridable from the database, so they stay consistent everywhere
 * and can eventually be managed from an admin panel.
 *
 * DB override: a `filter_options` table with rows `{ key text, value jsonb }`,
 * where `key` matches a field below (e.g. 'propertyTypes', 'paymentPlans') and
 * `value` is the replacement JSON. Missing/unset keys fall back to the defaults.
 */

export interface Option {
  value: string;
  label: string;
}

export interface FilterOptions {
  propertyTypes: Option[];
  beds: string[];
  baths: string[];
  completion: Option[];
  handoverYears: string[];
  paymentPlans: string[];
  languages: string[];
  nationalities: string[];
  priceRangeAed: { min: number; max: number };
  areaRangeSqft: { min: number; max: number };
}

export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  propertyTypes: [
    { value: '', label: 'All types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'plot', label: 'Plot' },
    { value: 'office', label: 'Office' },
    { value: 'retail', label: 'Retail' },
  ],
  beds: ['Studio', '1', '2', '3', '4', '5+'],
  baths: ['1', '2', '3', '4', '5+'],
  completion: [
    { value: '', label: 'Any' },
    { value: 'ready', label: 'Ready' },
    { value: 'off_plan', label: 'Off-plan' },
  ],
  handoverYears: ['2026', '2027', '2028', '2029', '2030+'],
  paymentPlans: ['40/60', '50/50', '60/40', '70/30', '80/20', '90/10'],
  languages: ['English', 'Arabic', 'Hindi', 'Urdu', 'Russian', 'Chinese', 'French'],
  nationalities: ['UAE', 'India', 'Pakistan', 'United Kingdom', 'Russia', 'Egypt', 'Lebanon', 'China'],
  priceRangeAed: { min: 0, max: 50_000_000 },
  areaRangeSqft: { min: 0, max: 20_000 },
};

function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function applyOverrides(base: FilterOptions, rows: { key: string; value: unknown }[]): FilterOptions {
  const out: FilterOptions = { ...base };
  for (const { key, value } of rows) {
    if (key in out && value != null) {
      // Trust the admin-managed shape; the UI is defensive about unknowns.
      (out as unknown as Record<string, unknown>)[key] = value;
    }
  }
  return out;
}

/**
 * Resolve filter options. Reads admin-managed overrides from Supabase when
 * configured/reachable, else returns the config defaults. Always returns a full
 * object so the UI never breaks.
 */
export async function getFilterOptions(): Promise<FilterOptions> {
  if (isSupabaseConfigured()) {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase.from('filter_options').select('key,value');
      if (!error && data && data.length > 0) {
        return applyOverrides(DEFAULT_FILTER_OPTIONS, data as { key: string; value: unknown }[]);
      }
    } catch {
      // fall through to defaults
    }
  }
  return DEFAULT_FILTER_OPTIONS;
}
