import { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase/firebaseConfig';
import Loading from '../components/ui/Loading/Loading';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    const provider = new GoogleAuthProvider();

    console.log("🚀 ~ AuthProvider ~ user:", user)
    console.log("🚀 ~ AuthProvider ~ errorMessage:", errorMessage)
    // logout
    const logout = () => {
        setLoading(true)
        signOut(auth)
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setErrorMessage(error.message)
            })
    }

    // Login email password
    // Login with email/password
    const loginWithEmailPassword = async (email, password) => {
        setLoading(true);
        setErrorMessage('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // signup with email password
    const signupWithEmailPassword = (email, password, name, photoUrl) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                profileUpdate(name, photoUrl)
            })
            .catch(error => {
                setLoading(false)
                setErrorMessage(error.message)
            })
    }

    // login with google
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
            .catch(error => {
                setLoading(false)
                setErrorMessage(error.message)
            })
    }

    // Update profile Information
    const profileUpdate = (name, photoUrl) => {
        setLoading(true)

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setErrorMessage(error.message)
            })
    }

    // Forget password 
    const resetPasswordWithEmail = (email) => {
        return sendPasswordResetEmail(auth, email)
            .catch(error => {
                setLoading(false)
                setErrorMessage(error.message)
            })
    }


    // Authenticate firebase user after reload
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            setErrorMessage('')
        });

        return () => unsubscribe();
    }, []);

    // context value
    const value = {
        user,
        loading,
        errorMessage,
        logout,
        loginWithEmailPassword,
        signupWithEmailPassword,
        loginWithGoogle,
        profileUpdate,
        resetPasswordWithEmail
    }


    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }