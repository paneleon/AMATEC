(() => {
    const start = () => 
    {
        console.log('Testing front end script');
    }

    let deleteButtons = document.querySelectorAll('btn-danger');

    for (button of deleteButtons)
    {
        button.addEventListener('click', (e) => {
            if(!confirm("Are You Sure?"))
            {
                e.preventDefault();
                window.location.assign('/surveys')
            }
        });
    }

    window.addEventListener('load', start);
})();