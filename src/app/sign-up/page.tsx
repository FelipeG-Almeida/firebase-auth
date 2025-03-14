'use client';
import { useCallback, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import {
    getRedirectResult,
    GoogleAuthProvider,
    signInWithRedirect,
} from 'firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [createUserWithEmailAndPassword] =
        useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log({ res });
            setEmail('');
            setPassword('');
            router.push('/');
        } catch (e) {
            console.error(e);
        }
    };

    const handleSignUpWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            signInWithRedirect(auth, googleProvider);
        } catch (e) {
            console.log(e);
        }
    };

    const checkRedirect = useCallback(async () => {
        try {
            const res = await getRedirectResult(auth);
            console.log({ res });
            if (res) {
                router.push('/');
            }
        } catch (e) {
            console.log(e);
        }
    }, [router]);

    useEffect(() => {
        checkRedirect();
    }, [checkRedirect]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900'>
            <div className='bg-gray-800 p-10 rounded-lg shadow-xl w-96'>
                <h1 className='text-white text-2xl mb-5'>Sign Up</h1>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500'
                />
                <button
                    onClick={handleSignUp}
                    className='w-full p-3 mb-4 bg-indigo-600 rounded text-white hover:bg-indigo-500 cursor-pointer'
                >
                    Sign Up
                </button>
                <button
                    onClick={handleSignUpWithGoogle}
                    className='w-full p-3 bg-white white rounded hover:shadow-xl cursor-pointer'
                >
                    Sign Up with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;

