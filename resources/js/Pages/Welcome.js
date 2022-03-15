import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>


                <div className="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                    Welcome to Task Manager!

                    {props.auth.user ? (
                        <> Click "Dashboard" in the top right to get started, {props.auth.user.name}.</>
                    ) : (
                        <> Click "Register" or "Login" in the top right to get started. </>
                    )}

                </div>

            </div>
        </>
    );
}
