const boxes = document.querySelectorAll('.box');
const linesAndCircles = Array.from(document.querySelectorAll('.line,.line-circle'));
const lines = Array.from(document.querySelectorAll('.line'));
const mainContentContainer = document.querySelector('.main-content');
const mainContent = [{ id: 1, title: 'Frontend Development', description: 'Frontend development involves creating the visible and interactive parts of a website or application that users interact with directly. This includes designing and coding the layout, visual elements, and user interface using programming languages such as HTML, CSS, and JavaScript. Frontend developers need to have a good understanding of user experience and design principles.' }, { id: 2, title: 'Backend Development', description: 'Backend development involves creating the underlying systems and infrastructure that power websites or applications. This includes managing databases, servers, and APIs to ensure that everything runs smoothly. Backend developers use languages like Python, Ruby, and Java to build and maintain the server-side of applications, and need to have a good understanding of data management and security.' }, { id: 3, title: 'Problem Solving', description: 'Problem solving is a critical skill for developers of all types, and involves identifying issues and coming up with effective solutions. This can involve debugging code, troubleshooting system issues, and finding ways to optimize performance. Strong problem solving skills require a combination of technical knowledge, creativity, and persistence. Good problem solvers are able to approach challenges with a positive attitude and a willingness to experiment and learn.' }, { id: 4, title: 'Fullstack Development', description: 'Fullstack development involves working on both the frontend and backend of an application, and typically requires a broad range of technical skills. Fullstack developers are responsible for building and maintaining the entire system, from the user-facing interface to the underlying infrastructure. This requires a strong understanding of both frontend and backend development, as well as project management skills.' }];
for (const box of boxes) {
    box.addEventListener('mouseenter', function (e) {
        handleMouseEnter(e);
    });

}
const handleMouseEnter = (e) => {
    showContent(mainContent.find(x => x.id == e.target.getAttribute('box-no')));
    for (const box of boxes) {
        if (box.classList.contains('mouse-enter-box-color')) {
            box.classList.remove('mouse-enter-box-color');
        }
    }
    linesAndCircles.forEach(x => {
        if (x.classList.contains('mouse-enter-line-circle-color')) {
            x.classList.remove('mouse-enter-line-circle-color');
            x.classList.add('initital-line-circle-color');
        }
    });
    lines.forEach(x => {
        if (x.classList.contains('line-one-mouse')) {
            x.classList.remove('line-one-mouse');
            x.classList.add('line-one-initial');
        } else if (x.classList.contains('line-two-mouse')) {
            x.classList.remove('line-two-mouse');
            x.classList.add('line-two-initial');
        } else if (x.classList.contains('line-three-mouse')) {
            x.classList.remove('line-three-mouse');
            x.classList.add('line-three-initial');
        } else if (x.classList.contains('line-four-mouse')) {
            x.classList.remove('line-four-mouse');
            x.classList.add('line-four-initial');
        }
    });
    e.target.classList.add('mouse-enter-box-color');
    const boxNo = e.target.getAttribute('box-count');
    let first = linesAndCircles.filter(x => x.classList.contains(`line-${boxNo}`));
    let second = linesAndCircles.filter(x => x.classList.contains(`line-circle-${boxNo}`));
    [...first, ...second].forEach(x => {
        x.classList.remove('initital-line-circle-color');
        x.classList.add('mouse-enter-line-circle-color');
    });
    const targetLine = first[0];
    if (targetLine.classList.contains('line-one')) {
        targetLine.classList.remove('line-one-initial');
        targetLine.classList.add('line-one-mouse');
    } else if (targetLine.classList.contains('line-two')) {
        targetLine.classList.remove('line-two-initial');
        targetLine.classList.add('line-two-mouse');
    } else if (targetLine.classList.contains('line-three')) {
        targetLine.classList.remove('line-three-initial');
        targetLine.classList.add('line-three-mouse');
    } else {
        targetLine.classList.remove('line-four-initial');
        targetLine.classList.add('line-four-mouse');
    }
};
const showContent = ({ title, description }) => {
    mainContentContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <h1>${title}</h1>
    <p>${description}</p>
    `;
    mainContentContainer.appendChild(div);
};
boxes[1].dispatchEvent(new MouseEvent("mouseenter", {
    bubbles: true,
    cancelable: true,
    view: window
}));