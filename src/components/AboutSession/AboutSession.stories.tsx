import { AboutSession } from "./AboutSession"

export default {
    title: "components/About Session",
    component: AboutSession,
}

export const session = () => {
    <AboutSession
        imageBg={"bg"}
        image={"img"}
        subtitle={"sub"}
        title={"titulo"}
        body={'body'}
    />
}