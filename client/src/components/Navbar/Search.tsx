import React from 'react';
import { BsSearch, BsXLg } from 'react-icons/bs';

const Search = () => {
    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <div className="border-b border-black/30 dark:border-white/20">
                <h5 className="text-xl">Search</h5>
                <div className="flex items-center gap-2 pl-4 pr-2 border shadow  my-6 rounded-xl">
                    <button title="Search">
                        <BsSearch />
                    </button>
                    <input
                        title="Search"
                        type="search"
                        name=""
                        id=""
                        placeholder="Search"
                        className="flex-1 py-2 bg-transparent outline-none"
                    />
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between my-3 font-semibold">
                    <h5>Recent</h5>
                    <button className="text-blue-400 text-sm hover:text-current">Clear all</button>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-4">
                        {TEST_DATA.map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                                <img src={item.avatar} alt="" className="w-12 h-12 rounded-full" />
                                <div className="flex-1 leading-5">
                                    <h5>{item.name}</h5>
                                    <h4 className="text-sm opacity-55">{item.username}</h4>
                                </div>
                                <button title="Remove" className="hover:opacity-75">
                                    <BsXLg />
                                </button>
                            </div>
                        ))}
                    </div>
                    {false && (
                        <div className="h-full flex items-center justify-center">
                            <span>No recent searches.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Search;

const TEST_DATA = [
    {
        id: 1,
        name: 'John Doe',
        username: 'john_doe',
        avatar: '/logo.jpg',
    },
    {
        id: 2,
        name: 'Jane smith',
        username: 'jane_smith',
        avatar: '/logo.jpg',
    },
    {
        id: 3,
        name: 'Laura',
        username: 'laura',
        avatar: '/logo.jpg',
    },
];
