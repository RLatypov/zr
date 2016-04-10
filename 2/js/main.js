var Chat = Class.create({
    init: function(opts) {
        this.idComment = '';
        this.test = opts.test;
        this.container = $('.comments');
    },
    available: function() {
        if (this.getLocalStorage('chat') != null) {
            this.setHtml(this.container,this.getLocalStorage('chat'));
        }
        else if(this.test) {
            var str = this.compileString(5,'',false,true);
            this.setLocalStorage('chat',str);
            this.setHtml(this.container,str);
        }
        else {
            this.showForm();
        }

        this.reply();
        this.submitMessage();
    },
    compileString: function(count,message,reply,test) {
        var cssClass = '';
        if (reply) {
            cssClass = 'reply';
        }

        if (test) {
            message = '<p>Lorem Ipsum is simply dummy message of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy message ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>';
        }

        var str = '';
        for (var i = 0; i < count; i++) {
            str +=
                '<div data-id="'+ this.getRandomArbitrary() +'" class="row comment '+ cssClass +'">' +
                    '<div class="col col-2 comment-image">' +
                        '<img src="img/image.jpg">' +
                    '</div>' +
                    '<div class="col col-10 comment-message">' +
                        '<p>' + message + '</p>' +
                        '<button class="comment-reply">Reply</button>' +
                    '</div>'+
                '</div>';
        }

        return str;
    },
    setLocalStorage: function(key,value) {
        localStorage.setItem(key,value);
    },
    getLocalStorage: function(key) {
        return localStorage.getItem(key);
    },
    setHtml: function(el,str) {
        el.html(str);
    },
    reply: function() {
        var obj = this;

        $('.comment-reply').on('click',function() {
            var $this = $(this),
                currentComment = $this.parents('.comment');

            obj.showForm();
            obj.idComment = currentComment.attr('data-id');
        });
    },
    submitMessage: function() {
        var obj = this;
        $('.form-comment button').on('click', function(e) {
            e.preventDefault();

            var message = $('.form-comment textarea').val();

            if(message != '') {
                var reply = obj.getLocalStorage('chat') != null,
                    str = obj.compileString(1,message,reply,false),
                    comment = $('.comment[data-id="'+ obj.idComment +'"]');

                if (obj.getLocalStorage('chat') != null) {
                    comment.append(str);
                } else {
                    obj.setHtml(obj.container,str);
                }

                obj.setLocalStorage('chat',obj.container.html());
                $(this).parents('form').submit();

            } else {
                alert('Message empty!');
            }
        });
    },
    showForm: function() {
        $('.page').addClass('form-show');
        $('.form-comment').addClass('open');
    },
    getRandomArbitrary: function () {
        return Math.floor(Math.random()* (1000000));
    },
    run: function() {
        if (Modernizr.localstorage) {
            this.available();
        } else {
            alert('window.localStorage is not available!');
        }
    }
});

var chat = new Chat({test: true});
chat.run();