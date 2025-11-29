import HomeClient from './HomeClient';

export default async function Page({
  params
}: {
  params: Promise<{locale: string}>
}) {
  return <HomeClient />;
}


