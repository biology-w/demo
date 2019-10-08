import React from 'react'

const Component = React.lazy(() => import(/* webpackChunkName: "react_virtualized" */"../Page"))

export default () => {
    return (
        <React.Suspense fallback={<div>loading...</div>}>
            <Component />
        </React.Suspense>
    )
}