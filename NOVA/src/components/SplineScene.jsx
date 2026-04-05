import React, { Suspense, lazy } from 'react';

// Lazy-load the heavy Splinetool dependency
const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
    return (
        <Suspense
            fallback={
                <div className="spline-loader">
                    <div className="spinner"></div> Loading 3D Scene...
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
            />
        </Suspense>
    );
}
