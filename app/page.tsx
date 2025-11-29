import { redirect } from 'next/navigation';

export default function RootPage() {
    // Redirect to the default locale 'fr'
    redirect('/fr');
}
