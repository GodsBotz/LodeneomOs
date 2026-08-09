window.LosPlayer = (function(){
  var audio = new Audio();
  audio.preload = 'auto';
  var unlocked = false;
  function unlock(){
    if(unlocked) return Promise.resolve();
    unlocked = true;
    // silent unlock via empty play/pause not needed with real file after tap
    return Promise.resolve();
  }
  function play(src, onEnd){
    return unlock().then(function(){
      audio.onended = onEnd || null;
      audio.onerror = function(){ if(onEnd) onEnd(); };
      audio.src = src;
      audio.currentTime = 0;
      var p = audio.play();
      if(p && p.catch) p.catch(function(){ /* blocked until user gesture */ });
      return p;
    });
  }
  function stop(){ try{ audio.pause(); audio.currentTime=0; }catch(e){} }
  function isPlaying(){ return !audio.paused && !audio.ended; }
  return { play:play, stop:stop, unlock:unlock, isPlaying:isPlaying, el:audio };
})();
