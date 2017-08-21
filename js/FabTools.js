var FabTools = function(){

    var parent = null;
    var main = {};
    var options = [];

    return {

        main:function(title, element_in, element_out){
            main = {title:title, element_in:element_in, element_out:element_out}
            return this;
        },

        option : function(title, background, element, click){
            options.push({title:title, element:element, click:click, background:background});
            return this;
        },

        parent(element){
            parent = element;
            return this;
        },

        builder : function(){

            if(!parent){
                console.log("error, favor definir container principal: appendTo(element)")
            }

            if(!main){

            }

            var container = $("<div>").addClass("container-fab").appendTo(parent);
            var start_bottom = 120;

            $("<div>")
                .addClass("fab-button")
                .data("toggle","tooltip")
                .data("placement","left")
                .data("title", main.title)
                .append($(main.element_in).addClass("fab-in fab-icon-center"))
                .append($(main.element_out).addClass("fab-out"))
                .appendTo(container)
                .tooltip();

            for(var i=0, len=options.length, delay_total = len*0.05; i<len; i++){

                var option = options[i];
                var duration = (i === 0) ? 0.3 : ((i === 1) ? 0.15 : 0.1);

                $("<a>")
                    .attr({"href": "javascript:void(0)"})
                    .addClass("fabs fab-item")
                    .css({
                        "bottom": (start_bottom + (i * 60)) + "px",
                        "annimation-delay": delay_total - (i * 0.05) + "s",
                        "annimation-duration": duration + "s",
                        "background-color": option.background
                    })
                    .click(option.click)
                    .append($(option.element).addClass("fab-icon-center"))
                    .data("toggle", "tooltip")
                    .data("placement", "left")
                    .data("title", option.title)
                    .tooltip()
                    .appendTo(container);

            }
        }
    }
}