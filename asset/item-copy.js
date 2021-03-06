$( document ).ready(function() {

    /* User key_identity and key_credential, activate the API keys tab of the user edit page to get them */
    var keyIdentity = 'TGxoqd9wlnyjfig3QIxfLxHuiLY83qlM';
    var keyCredential = 'mmeM3Lc9L1B3Petjj9YZ7g71SQ7tLvFQ';

    var url = window.location.href;
    var urlAdmin = url.split("/admin/item")[0];

    $(".tablesaw-cell-content").each(function() {
        var itemId =  $(this).children("input").attr("value");
        $(this).children("ul").prepend('<li><a class="o-icon-add item-copy" href="" title="Copy this Resource" aria-label="Copy this Resource" data-url="'+urlAdmin+'/api/items/'+itemId+'"></a></li>');
    });

    $('.item-copy').click(function(e){
        e.preventDefault();

        if (keyIdentity === 'your_key_identity' || keyCredential === 'your_key_credential') {
            alert('You should set your credential keys to copy an item.');
            return;
        }

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": $(this).data('url'),
            "method": "GET",
            "headers": {
                "content-type": "application/json",
            }
        })
        .done(function (response) {
            var content = response;
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": urlAdmin + "/api/items?key_identity=" + keyIdentity + "&key_credential=" + keyCredential,
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                },
                "data": JSON.stringify(content),
            })
            .done(function (response) {
                alert('Resource successfully copied !');
                window.location.href = urlAdmin+"/admin/item";
            });
        });
    });

});
