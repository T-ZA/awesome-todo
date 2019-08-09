// Data
const state = {
  tasks: {
    'ID1' : {
      name: 'Task 1',
      completed: false,
      dueDate: '08/15/2019',
      dueTime: '00:00'
    },
    'ID2' : {
      name: 'Task 2',
      completed: false,
      dueDate: '08/15/2019',
      dueTime: '06:00'
    },
    'ID3' : {
      name: 'Task 3',
      completed: false,
      dueDate: '08/15/2019',
      dueTime: '12:00'
    }
  }
  // tasks: [
  //   {
  //     id: 1,
  //     name: 'Task 1',
  //     completed: false,
  //     dueDate: '08/15/2019',
  //     dueTime: '00:00'
  //   },
  //   {
  //     id: 2,
  //     name: 'Task 2',
  //     completed: false,
  //     dueDate: '08/15/2019',
  //     dueTime: '00:00'
  //   },
  //   {
  //     id: 3,
  //     name: 'Task 3',
  //     completed: false,
  //     dueDate: '08/15/2019',
  //     dueTime: '00:00'
  //   }
  // ]
}

// Synchronous fuinctions to modify state
const mutations = {

}

// Can be asynchronous
// Called by components to modify state
const actions = {

}

// Retrieve data from state
const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
