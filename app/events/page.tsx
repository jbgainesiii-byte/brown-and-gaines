import type {Metadata} from "next";
import EventsPage from "./events-page";
export const metadata:Metadata={title:"Ryan Brown & Company events | Brown & Gaines",description:"Curated gatherings, recurring formats, and venue programs from Ryan Brown & Company, a Brown & Gaines product.",alternates:{canonical:"/events"},openGraph:{title:"Ryan Brown & Company events | Brown & Gaines",description:"Good things happen in the right room. Explore curated gatherings and venue programs.",url:"/events"}};
export default function Page(){return <EventsPage/>}
