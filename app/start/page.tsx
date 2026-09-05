import type {Metadata} from "next";
import IntakePage from "./intake-page";
export const metadata:Metadata={title:"Start a conversation | Brown & Gaines",description:"Tell Brown & Gaines what needs to change in your business.",alternates:{canonical:"/start"}};
export default function Page(){return <IntakePage/>}
