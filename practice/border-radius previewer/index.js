function onload() {
    const border_radius = {
        top_left: 0,
        top_right: 0,
        bottom_left: 0,
        bottom_right: 0
    }
    
    const demoBox = document.getElementById('demo');
    const border_inputs = {
        top_left: document.getElementById('1'),
        top_right: document.getElementById('2'),
        bottom_left: document.getElementById('3'),
        bottom_right: document.getElementById('4'),
    }
    
    const output = document.getElementById('output');
    
    window.addEventListener('keyup', (e) => {
        border_radius.top_left = border_inputs.top_left.value || 0;
        border_radius.top_right = border_inputs.top_right.value || 0;
        border_radius.bottom_left = border_inputs.bottom_left.value || 0;
        border_radius.bottom_right = border_inputs.bottom_right.value || 0;
        
        changeBorder(demoBox, border_radius);
        output.innerHTML = demoBox.style.cssText
    })
    
    function changeBorder(element, border_radius) {
        element.style.borderRadius = `${border_radius.top_left}px ${border_radius.top_right}px ${border_radius.bottom_right}px ${border_radius.bottom_left}px`
    }  
}