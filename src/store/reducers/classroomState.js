const initialState = {  }
  
  export default function classroomState(state = initialState, action) {
    if (action.type === 'UPDATE_CLASSROOM') {
        return action.payload;
    } else if (action.type === 'UPDATE_COURSE') { // Получает полноценный объект course, добавляет или обновляет элемент classroom
        let isJoined = false;
        const n_courses = state.courses.map(course => {
            if(course.id === action.payload.id)
            {
                isJoined = true;
                return action.payload;
            }
            return course;
        });
        return {
            ...state,
            courses: isJoined? n_courses : [...state.courses, action.payload]
        };
    }
    return state;
  }