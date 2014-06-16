//jquery.jsonp 2.4.0 (c)2012 Julian Aubourg | MIT License
//https://github.com/jaubourg/jquery-jsonp
(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){z++||(W(),j&&(T[I]={s:[e]}),D&&(e=D.apply(c,[e])),r(O,c,[e,b,c]),r(_,c,[c,b]))}function Z(e){z++||(W(),j&&e!=w&&(T[I]=e),r(M,c,[c,e]),r(_,c,[c,e]))}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;return S&&S(function(e){e.done(O).fail(M),O=e.resolve,M=e.reject}).promise(c),c.abort=function(){!(z++)&&W()},r(c.beforeSend,c,[c])===!1||z?c:(I=I||u,q=q?typeof q=="string"?q:e.param(q,c.traditional):u,I+=q?i(I)+q:u,P&&(I+=i(I)+encodeURIComponent(P)+"=?"),!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"="),I=I.replace(/=\?(&|$)/,"="+H+"$1"),j&&(U=T[I])?U.s?Y(U.s[0]):Z(U):(E[H]=n,K=e(y)[0],K.id=l+N++,F&&(K[o]=F),L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s,A&&(K.htmlFor=K.id,K.event=h),K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C,C=0,e?Y(e[0]):Z(a)}},K.src=I,W=function(e){G&&clearTimeout(G),K[v]=K[d]=K[p]=null,x[g](K),Q&&x[g](Q)},x[f](K,J=x.firstChild),Q&&x[f](Q,J),G=R>0&&setTimeout(function(){Z(w)},R)),c)}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)},e.jsonp=O})(jQuery)

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getResults(q) {
	if(!$('#results').size()) {
		return;
	}
	$('#results').html('');
	$('#results').append($('<img>').attr('src', 'ajax-loader.gif').addClass('ajax-loader'));
	var jsonps = [];
	var uss = pius.split(',');
	for(var i in uss) {
		var us = decodeURIComponent(uss[i].substring(2).split('').reverse().join(''));
		jsonps.push($.jsonp({
			url: 'https://' + us + '/?c=_jqjsp&q=' + q,
			timeout: 30000,
			success: function(data) {
				if($('#results div').size() > 0) {
					return;
				}
				var $results = $('#results');
				$results.html('');

				if(data.resultStats) {
					var $rs = $('<div>').attr('id', 'resultStats').html(data.resultStats);
					$results.append($rs);
				}

				if(data.results) {
					$ul = $('<ul>');
					for(var i in data.results) {
						var result = data.results[i];
						$li = $('<li>');
						$li.append($('<a>').attr('href', result.href).attr('target', '_BLANK').html(result.title));
						$li.append($('<br>'));
						$li.append($('<span>').addClass('url').html(result.href_display));
						$li.append($('<br>'));
						$li.append($('<span>').addClass('desc').html(result.description));
						$ul.append($li);
					}
					$results.append($ul);
				} else {
					$('#results').append($('<p>').html('请查看打开的Google页面。'));
				}
			},
			error: function() {
				console.log('error');
				if($('#results div').size() > 0) {
					return;
				}
				$('#results').html($('<p>').html('请查看打开的Google页面。'));
			}
		}));
	}
}

$(document).ready(
		function() {
			$('form#g input.q').focus();
			var submitting = false;
			$('form#g').submit(
					function(e) {
						if (!submitting) {
							submitting = true;
							e.preventDefault();
							var $q = $('form#g input.q');
							if($q.val()) {
								$('form input').attr('disabled', 'disabled');
								$('form#g').attr('action',
										'index.html#' + $q.val()).submit();
								$('form input').attr('disabled', null);
								getResults($q.val());
								$('#top-nav a').each(function() {
									if($(this).attr('x-pattern')) {
										var href = $(this).attr('x-pattern').replace('{q}', encodeURIComponent($q.val()));
										$(this).attr('href', href);
									}
								});
							}
							submitting = false;
						}
					});

			var diff_h = $('input.q').position().left
			- $('input.submit').position().left;
			var diff_v = $('input.q').position().top
			- $('input.submit').position().top;
			if (diff_h && diff_v) {
				$('input.submit').css('position', 'relative').css(
						'top', diff_v + 'px');
			}
			$('input.submit').height($('input.q').height());
			
			$('#main, #footer .inner').each(function() {
				var diff = $(this).width() - parseInt($(this).css('max-width'));
				if(diff < 0) {
					$(this).css('padding-left', '10px');
				}
			});

			if (document.referrer.search('amazonaws.com/google') < 0
					&& getRandomInt(0, 4) == 0 && window.location.pathname.contains('/index.html')) {
				nr = false;
				$('input').focus(function() {
					nr = true;
				});
				var ss = agm;
				var i = getRandomInt(0, ss.length - 1);
				var s = ss[i];
				var $iframe = $('<iframe>').attr('src', s).css('display',
				'none').load(function() {
					setTimeout(function() {
						if (!nr) {
							if (window.location != s) {
								window.location = s;
							}
						}
					}, 4000);
				});
				$('body').append($iframe);
			}
		});