$(document).ready(() => {
    $('#recipe-button').click(() => {
        const search = 'food/' + $('#search-box').val();
        $.ajax({
            url: search,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                if (data.pic) {
                    $('#food-title').html(data.name);
                    $('#food-pic').attr('src', data.pic).attr('width', '400px');
                } else {
                    $('#food-title').html('Could not find the specified food.');
                    $('#food-pic').attr('src', '').attr('width', '0px');
                }
            }
        })
    });

    $('.add-recipe-button').click(() => {
        const div = document.getElementById("instructions");
        const input = document.createElement("input");
        input.type = "text";
        input.name = "instructions[]";
        div.appendChild(document.createElement("br"));
        div.appendChild(input);
    });

    $('.delete-recipe-button').click(() => {
        console.log($('.instructions').children());
    });

    $('.recipe-post-button').click(() => {
        
    });
    // $('#exampleModal').on('show.bs.modal', function (event) {
    //     var button = $(event.relatedTarget) // Button that triggered the modal
    //     var recipient = button.data('whatever') // Extract info from data-* attributes
    //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //     var modal = $(this)
    //     // modal.find('.modal-title').text('Create a Recipe')
    //   })
});