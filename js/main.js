
const coursesData = [
    {
        id: 1,
        category: 'Marketing',
        title: 'The Ultimate Google Ads Training Course',
        price: 100,
        author: 'Jerome Bell',
        type: 'Advance',
        url:'image1.png'
    },
    {
        id: 2,
        category: 'Management',
        title: 'Product Management Fundamentals',
        price: 480,
        author: 'Marvin McKinney',
        type: 'Advancement',
        url:'image2.png'
    },
    {
        id: 3,
        category: 'HR & Recruiting',
        title: 'HR Management and Analytics',
        price: 200,
        author: 'Leslie Alexander Li',
        type: 'HR & Recruiting',
        url:'image3.png'
    },
    {
        id: 4,
        category: 'Marketing',
        title: 'Brand Management & PR Communications',
        price: 530,
        author: 'Kristin Watson',
        type: 'Marketing',
        url:'image4.png'
    },
    {
        id: 5,
        category: 'Design',
        title: 'Graphic Design Basic',
        price: 500,
        author: 'Guy Hawkins',
        type: 'Design',
        url:'image5.png'
    },
    {
        id: 6,
        category: 'Management',
        title: 'Business Development Management',
        price: 400,
        author: 'Dianne Russell',
        type: 'Management',
        url:'image6.png'
    },
    {
        id: 7,
        category: 'Development',
        title: 'Highload Software Architecture',
        price: 600,
        author: 'Brooklyn Simmons',
        type: 'Development',
        url:'image7.png'
    },
    {
        id: 8,
        category: 'HR & Recruiting',
        title: 'Human Resources - Selection and Recruitment',
        price: 150,
        author: 'Kathryn Murphy',
        type: 'HR & Recruiting',
        url:'image8.png'
    },
    {
        id: 9,
        category: 'Design',
        title: 'User Experience, Human-centered Design',
        price: 240,
        author: 'Cody Fisher',
        type: 'Design',
        url:'image9.png'
    }
];

const colorData = {
    'HR & Recruiting':'#F89828',
    'Design':'#F52F6E',
    'Development':'#7772F1',
    'Marketing':'#03CEA4',
    'Management':'#5A87FC'
}

const categories = [
    { id: 'all', name: 'All', count: coursesData.length },
    { id: 'management', name: 'Management', count: coursesData.filter(c => c.category === 'Management').length },
    { id: 'hr-recruiting', name: 'HR & Recruiting', count: coursesData.filter(c => c.category === 'HR & Recruiting').length },
    { id: 'marketing', name: 'Marketing', count: coursesData.filter(c => c.category === 'Marketing').length },
    { id: 'design', name: 'Design', count: coursesData.filter(c => c.category === 'Design').length },
    { id: 'development', name: 'Development', count: coursesData.filter(c => c.category === 'Development').length }
];

const state = {
    activeCategory: 'all',
    searchTerm: '',
    categories: [...categories],
    courses: [...coursesData]
};


const DOM = {
    coursesList: null,
    categoryFilters: null,
    searchInput: null
};


function initApp() {
 
    DOM.coursesList = document.getElementById('coursesList');
    DOM.categoryFilters = document.getElementById('categoryFilters');
    DOM.searchInput = document.getElementById('searchInput');
    
    renderCategoryFilters();
    renderCourses();
    setupEventListeners();
}


function renderCategoryFilters() {
    if (!DOM.categoryFilters) return;
    
    DOM.categoryFilters.innerHTML = '';
    
    state.categories.forEach(category => {
        const filterBtn = createFilterButton(category);
        DOM.categoryFilters.appendChild(filterBtn);
    });
}


function createFilterButton(category) {
    const filterBtn = document.createElement('button');
    filterBtn.className = `filter-btn ${category.id === state.activeCategory ? 'filter-btn--active' : ''}`;
    filterBtn.dataset.category = category.id;
    filterBtn.innerHTML = `
        ${category.name}
        <span class="filter-btn__badge">${category.count}</span>
    `;
    
    return filterBtn;
}

function renderCourses() {
    if (!DOM.coursesList) return;
    
    const filteredCourses = getFilteredCourses();
    
    DOM.coursesList.innerHTML = '';
    
    if (filteredCourses.length === 0) {
        renderNoResults();
        return;
    }
    
    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        DOM.coursesList.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const courseCard = document.createElement('article');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
 
        <img src="./assets/img/${course.url}" class="course-card__img"> 
        <div class="course-card__description">
            <span class="course-card__category" style='background-color:${colorData[course.category]}'>${course.category}</span>
            <h3 class="course-card__title">${course.title}</h3>
            <div class="course-card__price">$${course.price}</div>
            <div class="course-card__author">| by ${course.author}</div>
           
        </div>
    `;
    
    return courseCard;
}

function renderNoResults() {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
        <h3 class="no-results__title">No courses found</h3>
        <p class="no-results__text">Try changing your search or filter criteria</p>
    `;
    DOM.coursesList.appendChild(noResults);
}

function getFilteredCourses() {
    return state.courses.filter(course => {
        const matchesCategory = matchesCategoryFilter(course);
        const matchesSearch = matchesSearchFilter(course);
        
        return matchesCategory && matchesSearch;
    });
}

function matchesCategoryFilter(course) {
    if (state.activeCategory === 'all') return true;
    
    const category = state.categories.find(cat => cat.id === state.activeCategory);
    if (!category) return true;
    
    return course.category.toLowerCase() === category.name.toLowerCase();
}

function matchesSearchFilter(course) {
    if (!state.searchTerm.trim()) return true;
    
    const searchLower = state.searchTerm.toLowerCase();
    return course.title.toLowerCase().includes(searchLower) ||
           course.author.toLowerCase().includes(searchLower);
}

function updateCategoryCounts() {
    const updatedCategories = state.categories.map(category => {
        const count = getCategoryCount(category);
        return { ...category, count };
    });
    
    state.categories = updatedCategories;
    
    updateFilterButtons();
}

function getCategoryCount(category) {
    if (category.id === 'all') {
        return state.courses.filter(course => {
            return matchesSearchFilter(course);
        }).length;
    } else {
        const categoryName = category.name;
        return state.courses.filter(course => {
            const matchesCategory = course.category === categoryName;
            const matchesSearch = matchesSearchFilter(course);
            return matchesCategory && matchesSearch;
        }).length;
    }
}

function updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach((btn, index) => {
        const badge = btn.querySelector('.filter-btn__badge');
        if (badge && state.categories[index]) {
            badge.textContent = state.categories[index].count;
        }
        
        btn.classList.remove('filter-btn--active');
        if (btn.dataset.category === state.activeCategory) {
            btn.classList.add('filter-btn--active');
        }
    });
}

function handleFilterClick(e) {
    const filterBtn = e.target.closest('.filter-btn');
    if (!filterBtn) return;
    
    state.activeCategory = filterBtn.dataset.category;
    
    updateFilterButtons();
    renderCourses();
}

function handleSearchInput(e) {
    state.searchTerm = e.target.value.trim();
    
    updateCategoryCounts();
    renderCourses();
}

function createDebouncedSearchHandler() {
    let timeoutId = null;
    
    return function(e) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            state.searchTerm = e.target.value.trim();
            
            updateCategoryCounts();
            renderCourses();
        }, 300);
    };
}


function setupEventListeners() {

    if (DOM.categoryFilters) {
        DOM.categoryFilters.addEventListener('click', handleFilterClick);
    }
    

    if (DOM.searchInput) {
        const debouncedSearchHandler = createDebouncedSearchHandler();
        DOM.searchInput.addEventListener('input', debouncedSearchHandler);
        
        DOM.searchInput.addEventListener('input', handleSearchInput);
    }
}

document.addEventListener('DOMContentLoaded', initApp);

