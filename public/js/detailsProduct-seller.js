var slideIndex=1;
      var myTimer;
      function showSlides(n){
          var i;
          var slides = document.getElementsByClassName("mySlides");
          var pics = document.getElementsByClassName("pic");
          if (n > slides.length) {slideIndex = 1}
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
          }
          for (i = 0; i < pics.length; i++) {
              pics[i].className = pics[i].className.replace(" active", "");
          }
          slides[slideIndex-1].style.display = "block";
          pics[slideIndex-1].className += " active";
      }

      function plusSlides(n){
          clearInterval(myTimer);
          if (n < 0){
            showSlides(slideIndex -= 1);
          } else {
           showSlides(slideIndex += 1); 
          }
          if (n == -1){
            myTimer = setInterval(function(){plusSlides(n + 2)}, 1000);
          } else {
            myTimer = setInterval(function(){plusSlides(n + 1)}, 1000);
          }
      }

      function currentSlide(n){
          clearInterval(myTimer);
          myTimer = setInterval(function(){plusSlides(n + 1)}, 1000);
          showSlides(slideIndex = n);
      }

      window.addEventListener("load",function() {
          showSlides(slideIndex);
          myTimer = setInterval(function(){plusSlides(1)}, 1000);
      })


function openTab(tabName, elmnt) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    var color = '#fed136';
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

/// tooltip 

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$('.btn-number').click(function(e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});

$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(document).ready(function() {
    $("#submit-add-product").click(function() {
        var fileUpload = $("#addImg");
        console.log("I'm still here");
        if (parseInt(fileUpload.get(0).files.length) < 3) {
            alert("Phải có tối thiểu 3 ảnh");
            fileUpload.val("");
            console.log("I'm here");
        }
    });
});
$(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(document).ready(function() {
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
    $(".btn-refuse").on("click", function() {
        var tr = $(this).parents('tr').first();
        var child = tr.children();
        var id = parseInt(child[0].innerHTML);
        const urlParams = new URLSearchParams(window.location.search);
        const product_id = urlParams.get('id');
        confirmForm(function(confirm) {
            if (confirm) {
                tr.remove();
                $.post('/seller/refuse', { bidder_id: id, product_id: product_id });
            }
        });
    });
});

function toggleAddForm(e) {
    e.preventDefault();
    $('#add-more-description').toggle(); // display:block or none
}
$('#cancel').click(toggleAddForm);
$('#add-description').click(toggleAddForm);