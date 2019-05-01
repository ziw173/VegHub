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
                    $('#food-pic').attr('src', data.pic).attr('width', '200px');
                } else {
                    $('#food-title').html('Could not find food');
                    $('#food-pic').attr('src', '').attr('width', '0px');
                }
            }
        })
    });
});