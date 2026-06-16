import { SearchTabs } from './search-tabs';
import type { SearchTabKey } from '@/lib/portal-config';

interface SearchHeroProps {
  active: SearchTabKey;
  title: string;
  subtitle: string;
}

/** Title + subtitle + the tabbed search hero, shared by every vertical page. */
export function SearchHero({ active, title, subtitle }: SearchHeroProps) {
  return (
    <section className="container-wide pt-10 pb-8">
      <div className="text-center mb-8">
        <h1 className="display-md">{title}</h1>
        <p className="subhead mt-3 max-w-2xl mx-auto">{subtitle}</p>
      </div>
      <SearchTabs active={active} />
    </section>
  );
}
