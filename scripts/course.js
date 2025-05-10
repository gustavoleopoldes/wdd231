document.addEventListener('DOMContentLoaded', () => {

    const courses = [
        {
            code: "CSE 110",
            completed: true
        },
        {
            code: "WDD 130",
            completed: true
        },
        {
            code: "CSE 111",
            completed: true
        },
        {
            code: "CSE 210",
            completed: false
        },
        {
            code: "WDD 131",
            completed: true
        },
        {
            code: "WDD 231",
            completed: false
        }
    ];

    const coursesContainer = document.getElementById('courses-container');
    const allBtn = document.getElementById('all-btn');
    const cseBtn = document.getElementById('cse-btn');
    const wddBtn = document.getElementById('wdd-btn');

    allBtn.addEventListener('click', () => {
        setActiveButton(allBtn);
        displayCourses(courses);
    });
    
    cseBtn.addEventListener('click', () => {
        setActiveButton(cseBtn);
        const cseCourses = courses.filter(course => course.code.startsWith('CSE'));
        displayCourses(cseCourses);
    });
    
    wddBtn.addEventListener('click', () => {
        setActiveButton(wddBtn);
        const wddCourses = courses.filter(course => course.code.startsWith('WDD'));
        displayCourses(wddCourses);
    });
 
    function setActiveButton(activeButton) {
        [allBtn, cseBtn, wddBtn].forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
  
    function displayCourses(coursesToDisplay) {
        coursesContainer.innerHTML = '';
        
        coursesToDisplay.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
            courseCard.textContent = course.code;
            
            coursesContainer.appendChild(courseCard);
        });
    }
 
    displayCourses(courses);
});