'use client';
import { useEffect, useRef, useState } from 'react';
import { updateUser as handleUpdateUser, uploadImage } from '@/api';
import { useAuthContextProvider } from '@/context/authUserContext';

const EditProfile = () => {
    const { authUser, updateAuthUser } = useAuthContextProvider();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [updateProfile, setUpdateProfile] = useState({
        name: authUser?.name,
        avatar: authUser?.avatar,
        bio: authUser?.bio,
    });
    useEffect(() => {}, [authUser]);

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setUpdateProfile((prev) => ({
                ...prev,
                avatar: URL.createObjectURL(selectedFile),
            }));
        }
    };

    const handleSaveChange = async () => {
        try {
            if (!authUser || !updateProfile.name || updateProfile.name.length <= 8) return;
            if (
                updateProfile.avatar === authUser.avatar &&
                updateProfile.name === authUser.name &&
                updateProfile.bio === authUser.bio
            )
                return;
            const formData = new FormData();
            const response = await fetch(updateProfile.avatar as string);
            const blob = await response.blob();
            formData.append('filename', blob);
            const uploadResponse = await uploadImage({ formData: formData });
            if (uploadResponse) {
                const updated = await handleUpdateUser(authUser._id, {
                    ...updateProfile,
                    avatar: uploadResponse.downloadURL,
                });
                const updatedMinimal = {
                    avatar: uploadResponse.downloadURL,
                    name: updateProfile.name as string,
                    bio: updateProfile.bio as string,
                };
                updateAuthUser({
                    ...authUser,
                    ...updatedMinimal,
                });
                setUpdateProfile(updatedMinimal);
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        authUser && (
            <div className="max-w-2xl">
                <div className="flex justify-between items-center">
                    <img src={updateProfile.avatar ?? '/user.png'} alt="" className="w-52 h-52 rounded-full" />
                    <button
                        className="px-4 py-2 bg-blue-500 opacity-85 hover:opacity-100 font-bold rounded-full"
                        onClick={handleIconClick}
                    >
                        Change
                    </button>
                    <input
                        type="file"
                        title="Media"
                        accept="image/*,video/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mt-8">
                    <form action="post">
                        <span className="text-xl font-semibold">Name</span>
                        <textarea
                            name=""
                            id=""
                            title="Name"
                            rows={1}
                            placeholder="Name"
                            value={updateProfile.name}
                            onChange={(e) => setUpdateProfile((prev) => ({ ...prev, name: e.target.value.toString() }))}
                            className="w-full bg-transparent outline-none border rounded-md px-2 py-1"
                        ></textarea>
                    </form>
                </div>
                <div className="mt-8">
                    <form action="post">
                        <span className="text-xl font-semibold">Bio</span>
                        <textarea
                            name=""
                            id=""
                            title="Bio"
                            value={updateProfile.bio}
                            onChange={(e) => setUpdateProfile((prev) => ({ ...prev, bio: e.target.value.toString() }))}
                            placeholder="Bio"
                            className="w-full max-h-48 scroll_thin outline-none bg-transparent border rounded-md px-2 py-1"
                        ></textarea>
                    </form>
                </div>
                <div className="text-right mt-6">
                    <button
                        className={`bg-blue-500 px-5 py-2 min-w-48 rounded-full text-xl font-semibold ${
                            updateProfile.avatar != authUser.avatar ||
                            updateProfile.name != authUser.name ||
                            updateProfile.bio != authUser.bio
                                ? 'bg-blue-500'
                                : 'bg-blue-900'
                        } `}
                        onClick={handleSaveChange}
                    >
                        Save
                    </button>
                </div>
            </div>
        )
    );
};

export default EditProfile;
