$(document).ready(function () {

    'use strict';

    // ------------------------------------------------------- //
    // Search Box
    // ------------------------------------------------------ //
    $('#search').on('click', function (e) {
        e.preventDefault();
        $('.search-box').fadeIn();
    });
    $('.dismiss').on('click', function () {
        $('.search-box').fadeOut();
    });

    // ------------------------------------------------------- //
    // Card Close
    // ------------------------------------------------------ //
    $('.card-close a.remove').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.card').fadeOut();
    });

    // ------------------------------------------------------- //
    // Tooltips init
    // ------------------------------------------------------ //    

    $('[data-toggle="tooltip"]').tooltip()    


    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn();
    });
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut();
    });


    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');

        $('.side-navbar').toggleClass('shrinked');
        $('.content-inner').toggleClass('active');
        $(document).trigger('sidebarChanged');

        if ($(window).outerWidth() > 1183) {
            if ($('#toggle-btn').hasClass('active')) {
                $('.navbar-header .brand-small').hide();
                $('.navbar-header .brand-big').show();
            } else {
                $('.navbar-header .brand-small').show();
                $('.navbar-header .brand-big').hide();
            }
        }

        if ($(window).outerWidth() < 1183) {
            $('.navbar-header .brand-small').show();
        }
    });

    //Edit table
    function TableEdit() {

  
        $('td').click(function() {        
            var td_value = $(this).html();
            var input_field = '<input type="text" id="edit" value="' + td_value + '" />'
            $(this).empty().append(input_field);
            $('input').focus();
            var i = 0;
            $('td').off('click');
        
            $(this).find('input').blur(function(){
            var new_text = $(this).val();
            $(this).parent().html(new_text);
            TableEdit();
            })
        });
    }
    //Accept edit table btn

    $('#edit-table').on('click', function () {
        TableEdit();//typically called from ajax
    });
    //Confirm form
    var confirmForm = function(callback) {

        $("#modal-btn-yes").on("click", function() {
        $("#confirm-modal").modal('hide')
        return callback(true);
        });
  
        $("#modal-btn-no").on("click", function() {
        $("#confirm-modal").modal('hide');
        return callback(false);
        });
    }
    $(".delete").on("click", function() {

        var tr = $(this).parents('tr').first();
        confirmForm(function(confirm) {
            if(confirm)
            {
                tr.remove();
            }
        });
    });
    $(".accept").on("click", function() {

        var tr = $(this).parents('tr').first();
        confirmForm(function(confirm) {
            if(confirm)
            {
                tr.remove();
            }
        });
    });
    //Add form
    function toggleAddForm(e){
        e.preventDefault();
        $('#add').toggle(); // display:block or none
    }
    $('#cancel').click(toggleAddForm);
    $('#add-btn').click(toggleAddForm);
    $('#submit-btn').click(toggleAddForm);
});