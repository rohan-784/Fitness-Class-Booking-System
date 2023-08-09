// script.js
// Fetch class schedule data from the server
// fetch('/api/schedule')
//   .then(response => response.json())
//   .then(data => {
//     // Process the received data and generate the class schedule HTML dynamically
//     const classScheduleElement = document.getElementById('class-schedule');
    
//     // Iterate over the received data and generate HTML elements for each class
//     data.forEach(classData => {
//       const classElement = document.createElement('div');
//       classElement.classList.add('class-item');
      
//       // Customize the class element with class data
//       classElement.innerHTML = `
//         <h2>${classData.name}</h2>
//         <p>${classData.description}</p>
//         <p>Time: ${classData.time}</p>
//         <p>Instructor: ${classData.instructor}</p>
//         <button class="book-button">Book Class</button>
//       `;
      
//       // Append the class element to the schedule container
//       classScheduleElement.appendChild(classElement);
//     });
//   })
//   .catch(error => {
//     console.error('Failed to fetch class schedule data:', error);
//   });



// Function to show/hide the confirmation message
// function showConfirmation() {
//   const confirmation = document.querySelector('.confirmation');
//   confirmation.style.display = 'block';
//   setTimeout(() => {
//     confirmation.style.display = 'none';
//   }, 3000);
// }
// Add event listener to the booking form
// const form = document.querySelector('form');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   showConfirmationchedules.forEach((schedule) => {
//     if (schedule.classList.contains('selected')) {
//       schedule.classList.remove('selected');
//     }
//   });
//   const selectedClass = document.querySelector(`[value="${form.elements.class.value}"]`);
//   selectedClass.classList.add('selected');
//   showConfirmation();
// });


// Sample data for classes (replace this with your actual data)


const classes = [
  {
    name: 'Yoga Class',
    date: '2023-07-31',
    time: '10:00 AM',
    instructor: 'John Doe',
    day: 'Sunday'
  },
  {
    name: 'Cardio Workout',
    date: '2023-08-01',
    time: '6:30 PM',
    instructor: 'Jane Smith',
    day: 'Monday'
  },
  {
    name: 'Weight Training',
    date: '2023-08-02',
    time: '5:00 PM',
    instructor: 'Mike Johnson',
    day: 'Tuesday'
  }
];


const currentDate = new Date();
const currentDay = currentDate.getDate(); // Get the day of the month for the current date
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

classes.forEach((item, index) => {
  const date = new Date(item.date);
  const classDay = date.getDate(); // Get the day of the month for the class date
  const classMonth = date.getMonth();
  const classYear = date.getFullYear();

  if (classYear < currentYear || (classYear === currentYear && classMonth < currentMonth) || (classYear === currentYear && classMonth === currentMonth && classDay < currentDay)) {
    // If the class date is before the current date, update the date and day to the next available date
    classes[index].date = `${currentYear}-${currentMonth + 1}-${currentDay + index}`;
    classes[index].day = getDayName(date.getDay() + index);
  } else {
    // Otherwise, keep the original date and day
    classes[index].date = `${classYear}-${classMonth + 1}-${classDay + index}`;
    classes[index].day = getDayName(date.getDay() + index);
  }
});

function getDayName(day) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day % 7];
}

console.log(classes);


document.addEventListener('DOMContentLoaded', function () {
  const calendarContainer = document.getElementById('calendarContainer');
  const viewScheduleBtn = document.getElementById('viewScheduleBtn');
  
  const waitlistContainer = document.getElementById('waitlistContainer');
  const joinWaitlistBtn = document.getElementById('joinWaitlistBtn');
  const waitlistClassName = document.getElementById('waitlistClassName');
  const waitlistInstructor = document.getElementById('waitlistInstructor');

  
  const searchButton = document.getElementById('searchButton');
  const dateInput = document.getElementById('dateInput');
  const resultBox = document.createElement('div');
  resultBox.classList.add('result-box');

  const yogaRadio = document.getElementById('yogaRadio');
  const cardioRadio = document.getElementById('cardioRadio');
  const weightTrainingRadio = document.getElementById('weightTrainingRadio');
  const instructorDropdown = document.getElementById('instructorDropdown');
  const dayDropdown = document.getElementById('dayDropdown');
  const timeInput = document.getElementById('timeInput');

  
  

  // Function to filter classes based on selected filters
  function filterClasses() {
    const selectedClassType = document.querySelector('input[name="classType"]:checked');
    const selectedInstructor = instructorDropdown.value;
    const selectedDay = dayDropdown.value;
    const selectedTime = timeInput.value;

    // Loop through all the class elements and show/hide based on the selected filters
    const classElements = document.querySelectorAll('.day');
    classElements.forEach((classElement) => {
      const classType = classElement.dataset.classType;
      const classInstructor = classElement.dataset.instructor;
      const classDay = classElement.dataset.day;
      const classTime = classElement.dataset.time;

      const showClass =
        (!selectedClassType || selectedClassType.value === classType) &&
        (selectedInstructor === 'all' || selectedInstructor === classInstructor) &&
        (selectedDay === 'all' || selectedDay === classDay) &&
        (!selectedTime || selectedTime === classTime);

      classElement.style.display = showClass ? 'grid' : 'none';
    });
  }

  


  // Function to generate the calendar
  function generateCalendar() {
    // Remove any previously added class elements
    const classElements = document.querySelectorAll('.day');
    classElements.forEach((classElement) => {
      classElement.remove();
    });


    const today = new Date().toISOString().split('T')[0];

    classes.forEach((fitnessClass) => {
      const classDate = new Date(fitnessClass.date);
      const dayOfWeek = classDate.toLocaleString('en-us', { weekday: 'short' });
      const dayNumber = classDate.getDate();
      
      const event = document.createElement('div');
      event.classList.add('event');
      event.textContent = `${fitnessClass.name} with ${fitnessClass.instructor}\n${fitnessClass.time}`;

      const day = document.createElement('div');
      day.classList.add('day');
      day.textContent = `${dayOfWeek} ${dayNumber}`;
      day.dataset.classType = fitnessClass.name; // Store class type
      day.dataset.instructor = fitnessClass.instructor; // Store instructor
      day.dataset.day = fitnessClass.day; // Store class day
      day.dataset.time = fitnessClass.time; // Store class time
      day.appendChild(event);


      // Add "Book Now" button for each class
      const bookButton = document.createElement('button');
      bookButton.classList.add('book-button');
      bookButton.textContent = 'Reminder';
      bookButton.dataset.className = fitnessClass.name;
      bookButton.dataset.classDate = fitnessClass.date;
      bookButton.dataset.classTime = fitnessClass.time;

      // Attach the event listener to the "Book Now" button
      bookButton.addEventListener('click', function () {
        const className = bookButton.dataset.className;
        const classDate = bookButton.dataset.classDate;
        const classTime = bookButton.dataset.classTime;

        // Call the bookClass function with class details
        bookClass(className, classDate, classTime);
      });

      day.appendChild(bookButton); // Add the "Book Now" button to the class element
        

      calendarContainer.appendChild(day);


      
    });
  }

  function searchClasses() {
    const selectedClassType = document.querySelector('input[name="classType"]:checked');
    const selectedInstructor = instructorDropdown.value;
    const selectedDay = dayDropdown.value;
    const selectedTime = timeInput.value;
  
    // Clear previous results
    resultBox.innerHTML = '';
  
    // Check if the dateInput has a valid value, otherwise show all classes
    const selectedDate = dateInput.value ? new Date(dateInput.value) : null;
  
    let classesToShow = classes.filter((fitnessClass) => {
      const classDate = new Date(fitnessClass.date);
      const classTime = new Date(`2023-07-30 ${fitnessClass.time}`);
      const today = new Date();
  
      return (
        (!selectedClassType || selectedClassType.value === fitnessClass.name) &&
        (selectedInstructor === 'all' || selectedInstructor === fitnessClass.instructor) &&
        (selectedDay === 'all' || selectedDay === fitnessClass.day) &&
        (!selectedTime || selectedTime === fitnessClass.time) &&
        (!selectedDate || classDate >= selectedDate || (classDate > today && classTime > today))
      );
    });
  
    if (classesToShow.length > 0) {
      classesToShow.forEach((fitnessClass) => {
        const classDate = new Date(fitnessClass.date);
        const dayOfWeek = classDate.toLocaleString('en-us', { weekday: 'short' });
  
        const classInfo = document.createElement('div');
        classInfo.classList.add('class-info');
        classInfo.textContent = `${dayOfWeek} ${fitnessClass.date}, ${fitnessClass.time} - ${fitnessClass.name} with ${fitnessClass.instructor}`;
  
        resultBox.appendChild(classInfo);
      });
    } else {
      const noClassInfo = document.createElement('div');
      noClassInfo.textContent = 'No class is available on this day.';
  
      resultBox.appendChild(noClassInfo);
    }
  
    // Clear previous result and display the updated result box below the class filter section
    resultBox.innerHTML = '';
    const filtersDiv = document.querySelector('.filters');
    filtersDiv.appendChild(resultBox);
  }


  // Attach event listeners to class filters
  yogaRadio.addEventListener('change', filterClasses);
  cardioRadio.addEventListener('change', filterClasses);
  weightTrainingRadio.addEventListener('change', filterClasses);
  instructorDropdown.addEventListener('change', filterClasses);
  dayDropdown.addEventListener('change', filterClasses);
  timeInput.addEventListener('change', filterClasses);

  // Attach event listener to "Search" button
  searchButton.addEventListener('click', function () {
    searchClasses();
  });

  // Attach event listener to "View Schedule" button
  viewScheduleBtn.addEventListener('click', function () {
    // Show/hide the calendar when the button is clicked
    calendarContainer.style.display = (calendarContainer.style.display === 'none') ? 'block' : 'none';
    // Generate the calendar only when it's displayed for the first time
    if (calendarContainer.style.display === 'block') {
      generateCalendar();
    }
  });


  // Function to join the waitlist for a class
  function joinWaitlist(className, instructor) {
    waitlistClassName.textContent = className;
    waitlistInstructor.textContent = instructor;

    // Show the waitlist container
    calendarContainer.style.display = 'block';
    waitlistContainer.style.display = 'none';
  }

  // Attach event listener to join the waitlist button
  joinWaitlistBtn.addEventListener('click', function () {
    // Implement your logic here to add the user to the waitlist
    // You can store the waitlist data in a database or use any other method as per your backend setup
    alert('You have joined the waitlist!');
    waitlistContainer.style.display = 'none';
    calendarContainer.style.display = 'block'; // Display the calendar again after the user joins the waitlist

  });
  
  // Function to show a reminder notification
  function showReminderNotification(className, classDate, classTime) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = `Reminder: You have booked "${className}" on ${classDate} at ${classTime}`;

    document.body.appendChild(notification);

    // Hide the notification after 5 seconds (adjust the time as needed)
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  }

  // Function to handle class booking
  function bookClass(className, classDate, classTime) {
    // Here you can implement the actual booking logic
    // For this example, we'll just show a reminder notification
    showReminderNotification(className, classDate, classTime);
  }

  // Attach event listeners to book buttons to simulate class booking
  const bookButtons = document.querySelectorAll('.book-button');
  bookButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const className = button.dataset.className;
      const classDate = button.dataset.classDate;
      const classTime = button.dataset.classTime;

      // Call the bookClass function with class details
      bookClass(className, classDate, classTime);
    });
  });

  // Function to handle review submission
  function submitReview() {
    const className = document.getElementById('classNameInput').value;
    const rating = document.getElementById('ratingInput').value;
    const reviewText = document.getElementById('reviewTextInput').value;

    // Validate inputs
    if (!className || !rating || !reviewText) {
      alert('Please fill in all fields.');
      return;
    }

    // You can handle the review submission and storage logic here
    // For this example, we'll just display the review on the page
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `<h2 class="hew">${className}</h2>  <h4 class="rew">${rating} star</h4> <textarea class="main-para red" style="/* width: 824px; */height: 340px;">${reviewText}</textarea>`;
    document.querySelector('.review-list').appendChild(reviewItem);

    // Clear the form fields after submission
    document.getElementById('classNameInput').value = '';
    document.getElementById('ratingInput').value = '';
    document.getElementById('reviewTextInput').value = '';
  }

  // Attach event listener to the "Submit Review" button
  const submitReviewBtn = document.getElementById('submitReviewBtn');
  submitReviewBtn.addEventListener('click', submitReview);



 

  


  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('contactForm');

  submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form input (add your own validation logic as needed)
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate form submission (you can replace this with your actual form submission logic)
    // For this example, we'll display a confirmation message
    showConfirmationMessage();

    // Clear form fields after submission
    clearFormFields();
  });

  // Function to show a confirmation message
  function showConfirmationMessage() {
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('confirmation-message');
    confirmationMessage.textContent = 'Thank you for your message! We will get back to you soon.';

    // Append the confirmation message after the form
    form.appendChild(confirmationMessage);

    // Hide the confirmation message after 5 seconds (adjust the time as needed)
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 5000);
  }

  // Function to clear form fields after submission
  function clearFormFields() {
    const formFields = form.querySelectorAll('input, textarea');
    formFields.forEach((field) => {
      field.value = '';
    });
  }




  // // Function to handle contact form submission
  // function handleContactFormSubmit(event) {
  //   event.preventDefault();

  //   // Here you can implement the logic to handle the contact form submission
  //   // For this example, we'll just display a success message
  //   const name = document.getElementById('name').value;
  //   alert(`Thank you, ${name}! Your message has been received.`);
  //   document.getElementById('contactForm').reset();
  // }

  // // Attach event listener to the contact form
  // const contactForm = document.getElementById('contactForm');
  // contactForm.addEventListener('submit', handleContactFormSubmit);

  
});

