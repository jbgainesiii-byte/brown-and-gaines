import type {Metadata} from "next";
import EventsPage from "./events-page";
export const metadata:Metadata={title:"Upcoming events | Brown & Gaines",description:"Business workshops, founder gatherings, and venue programming from Brown & Gaines. Find out what is coming next.",alternates:{canonical:"/events"},openGraph:{title:"Upcoming events | Brown & Gaines",description:"Good things happen in the right room. Workshops, founder gatherings, and venue programming.",url:"/events"}};
export default function Page(){return <EventsPage/>}
