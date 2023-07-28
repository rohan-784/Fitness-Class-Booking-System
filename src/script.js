// script.js
// Fetch class schedule data from the server
fetch('/api/schedule')
  .then(response => response.json())
  .then(data => {
    // Process the received data and generate the class schedule HTML dynamically
    const classScheduleElement = document.getElementById('class-schedule');
    
    // Iterate over the received data and generate HTML elements for each class
    data.forEach(classData => {
      const classElement = document.createElement('div');
      classElement.classList.add('class-item');
      
      // Customize the class element with class data
      classElement.innerHTML = `
        <h2>${classData.name}</h2>
        <p>${classData.description}</p>
        <p>Time: ${classData.time}</p>
        <p>Instructor: ${classData.instructor}</p>
        <button class="book-button">Book Class</button>
      `;
      
      // Append the class element to the schedule container
      classScheduleElement.appendChild(classElement);
    });
  })
  .catch(error => {
    console.error('Failed to fetch class schedule data:', error);
  });