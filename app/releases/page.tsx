import 'server-only';
import NewReleases from 'app/releases/NewReleases';
import { createServerClient } from 'utils/supabase-server';

export const revalidate = 10;
export const metadata = {
  title: 'New Releases | Perfect Albums',
};

export default async function NewReleasesPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <NewReleases releases={data ?? []} session={session} />;
}
