import { Suspense } from "react";

// @ts-ignore
function withLazyComponent(Children) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Children />
        </Suspense>
    )
}

export default withLazyComponent;