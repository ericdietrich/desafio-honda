console.log("et"),console.log("object");


function createSlick(){$(".accessories-slick").slick({dots:!0,infinite:!1,speed:300,slidesToShow:4,slidesToScroll:4,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})}$(document).on("ready",createSlick);
//# sourceMappingURL=all.js.map