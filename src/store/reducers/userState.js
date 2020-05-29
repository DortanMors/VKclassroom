const initialState = {}
  
  export default function userState(state = initialState, action) {
    if (action.type === 'GET_USERSTATE') {
      return action.payload;
    }
    else if (action.type === 'ADD_COURSE') {
      return {
          ...state,
          courses: [
              ...state.courses,
              action.payload
          ]
      };
    }
    else if (action.type === 'DELETE_COURSE_BY_ID') {
        const n_courses = state.courses.filter(course => course.id!==action.payload);
        return {
            ...state,
            courses: n_courses
        };
    }
    else if (action.type === 'UPDATE_TASKS_BY_COURSE_ID') { // Принимает объект { course_id, tasks }
        const n_courses = state.courses.map(course => {
            if(course.id === action.payload.course_id)
            {
                return {
                    ...course,
                    tasks: action.payload.tasks
                }
            }
            return course;
        });
        return {
            ...state,
            courses: n_courses
        };
    }
    return state;
  }