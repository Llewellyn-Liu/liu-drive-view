import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useFileListStore = defineStore('file-list', {
    state: () => ({
        list: [{
            "filename": "1-TestFile-0",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.239252Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-1",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.27326Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-2",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.279261Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-3",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.286495Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-4",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.29166Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-5",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.297887Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-6",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.303005Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-7",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.307961Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-8",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.313108Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-9",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.318204Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-10",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.339596Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-11",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.344628Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-12",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.349629Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-13",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.35463Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-14",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.358676Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-15",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.364827Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-16",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.369982Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-17",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.376325Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-18",
            "userId": "test_id",
            "type": "test",
            "accessibility": 0,
            "dateCreated": "2023-09-19T08:16:37.382489Z",
            "tags": ""
        }, {
            "filename": "1-TestFile-19",
            "userId": "test_id",
            "type": "test",
            "accessibility": 1,
            "dateCreated": "2023-09-19T08:16:37.386609Z",
            "tags": ""
        }],
        memo: [
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit ais nostrud exercerit in  est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit ais nostrud exercerit in  est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit ais nostrud exercerit in  est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
            {
                title: 'Memo',
                content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                tag: ['apple', 'banana']
            },
        ],
    }),
    getters: {
        getList: (state) => {
            return state.list
        },
        getFilter: (state) => {
            return (list) => state.list.filter(e => list.includes(e.accessibility.toString()));
        },
    },
    actions: {
        setList(fileList) {
            this.list = fileList;
        },

        setMemo(memoList) {
            this.memo = memoList;
        },

        clear() {
            this.list = [];
            this.memo = [];
        },

    }
})