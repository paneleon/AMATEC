(() => {

    const start = () => {
        console.log('Front end Scripts working!');
    }

    let deleteButtons = document.querySelectorAll('.delete');

    for(button of deleteButtons)
    {
        button.addEventListener('click', (e) => {
            if(!confirm("Are you sure? Cannot be undone!"))
            {
                e.preventDefault();
                window.location.assign('/surveys');
            }
        });
    }

    window.addEventListener('load', start);
})();