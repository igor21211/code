const roles = {
  admin: "https://www.flaticon.com/svg/static/icons/svg/1424/1424453.svg",
  student: "https://www.flaticon.com/svg/static/icons/svg/1424/1424424.svg",
  lector: "https://www.flaticon.com/svg/static/icons/svg/1424/1424450.svg",
};

const gradation = {
  20: "satisfactory",
  55: "good",
  85: "very-good",
  100: "excellent",
};

const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922522.svg",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 20,
      },
      {
        title: "Java Enterprise",
        mark: 100,
      },
    ],
  },
  {
    name: "Amal Smith",
    age: 20,
    img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922656.svg",
    role: "student",
  },
  {
    name: "Noah Smith",
    age: 43,
    img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922616.svg",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 50,
      },
    ],
  },
  {
    name: "Charlie Smith",
    age: 18,
    img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922688.svg",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 75,
      },
      {
        title: "Java Enterprise",
        mark: 23,
      },
    ],
  },
  {
    name: "Emily Smith",
    age: 30,
    img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922565.svg",
    role: "admin",
    courses: [
      {
        title: "Front-end Pro",
        score: 10,
        lector: "Leo Smith",
      },
      {
        title: "Java Enterprise",
        score: 50,
        lector: "David Smith",
      },
      {
        title: "QA",
        score: 75,
        lector: "Emilie Smith",
      },
    ],
  },
  {
    name: "Leo Smith",
    age: 253,
    img: "https://www.flaticon.com/svg/static/icons/svg/2922/2922719.svg",
    role: "lector",
    courses: [
      {
        title: "Front-end Pro",
        score: 78,
        studentsScore: 79,
      },
      {
        title: "Java Enterprise",
        score: 85,
        studentsScore: 85,
      },
    ],
  },
];

class User {
  constructor(userData) {
    this.userData = userData;
  }

  render() {
    const mainContainer = document.querySelector(".users");
    const userContainer = document.createElement("div");
    const mainDev = document.createElement("div");
    userContainer.className = "user";
    mainDev.className = "user__info";
    mainDev.innerHTML = `
	<div class="user__info--data">
            <img
              src="${this.userData.img}"
              alt="${this.userData.name}"
              height="50"
            />
            <div class="user__naming">
              <p>Name: <b>${this.userData.name}</b></p>
              <p>Age: <b>${this.userData.age}</b></p>
            </div>
          </div>
          <div class="user__info--role ${this.userData.role}">
            <img
              src="${roles[this.userData.role]}"
              alt="${this.userData.role}"
              height="25"
            />
            <p>${this.userData.role}</p>
          </div>
	`;
    userContainer.appendChild(mainDev);
    if (this.userData.courses) {
      const mainDevCourses = document.createElement("div");
      mainDevCourses.className = `user__courses ${this.userData.role}--info`;
      mainDevCourses.innerHTML = this.renderCourses();
      userContainer.appendChild(mainDevCourses);
    }
    mainContainer.appendChild(userContainer);
  }

  renderCourses() {
    return "";
  }

  setAssessment(mark) {
    if (mark > 55 && mark < 85) {
      return 55;
    }
    if (mark > 85 && mark < 100) {
      return 85;
    }
    if (mark > 100) {
      return 100;
    }
    return 20;
  }
}

class Student extends User {
  renderCourses() {
    if (!this.userData.courses) {
      return "";
    }

    const courses = this.userData.courses;
    const itemCourses = courses.map((element) => {
      const descriptionMark = gradation[this.setAssessment(element.mark)];
      return `
      <p class="user__courses--course student">
      ${element.title} <span class="${descriptionMark}">${descriptionMark}</span>
    </p>
      `;
    });

    return itemCourses.join("");
  }
}

class Admin extends User {
  renderCourses() {
    if (!this.userData.courses) {
      return "";
    }
    const courses = this.userData.courses;
    const itemCourses = courses.map((element) => {
      const descriptionScore = gradation[this.setAssessment(element.score)];
      return `
      <div class="user__courses--course ${this.userData.role}">
      <p>Title: <b>${element.title}</b></p>
      <p>Admin's score: <span class="${descriptionScore}">${descriptionScore}</span></p>
      <p>Lector: <b>${element.lector}</b></p>
    </div>
      `;
    });

    return itemCourses.join("");
  }
}

class Lector extends User {
  renderCourses() {
    if (!this.userData.courses) {
      return "";
    }
    const courses = this.userData.courses;
    const itemCourses = courses.map((element) => {
      const descriptionScore = gradation[this.setAssessment(element.score)];
      const descriptionStudentScore =
        gradation[this.setAssessment(element.studentsScore)];
      return `
      <div class="user__courses--course ${this.userData.role}">
      <p>Title: <b>${element.title}</b></p>
      <p>Lector's score: <span class="${descriptionScore}">${descriptionScore}</span></p>
      <p>
        Average student's score:
        <span class="${descriptionStudentScore}">${descriptionStudentScore}</span>
      </p>
    </div>
      `;
    });
    return itemCourses.join("");
  }
}

users.forEach((userData) => {
  let user;
  switch (userData.role) {
    case "student":
      user = new Student(userData);
      break;
    case "lector":
      user = new Lector(userData);
      break;
    case "admin":
      user = new Admin(userData);
      break;
    default:
      user = new User(userData);
      break;
  }
  user.render();
});
