const boxes = document.querySelectorAll('.box');
const linesAndCircles = Array.from(document.querySelectorAll('.line,.line-circle'));
const lines = Array.from(document.querySelectorAll('.line'));
for (const box of boxes) {
    box.addEventListener('mouseenter', function (e) {
        handleMouseEnter(e);
    });

}
const handleMouseEnter = (e) => {
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
boxes[1].dispatchEvent(new MouseEvent("mouseenter", {
    bubbles: true,
    cancelable: true,
    view: window
}));