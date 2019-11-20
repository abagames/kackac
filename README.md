# kackac

Kac-kac (rect-rect) games.

## Demo

[rotwal](https://abagames.github.io/kackac/index.html?rotwal)

[![rotwal screenshot](docs/rotwal/screenshot.gif)](https://abagames.github.io/kackac/index.html?rotwal)

```
tc||(r=vec(0,99)),r.y>98&&(r=vec(rnd(9,90)),l=0,a=rnd(2*PI),m=rnds(.1)*df),col=G,box(p=vec(50,70),7,7),p.addAngle(b=p.getAngle(inp.p),15),col=B,bar(p,9,5,b+PI/2),col=R;c=bar(r,l,4,a,0);c&B&&(play(C),r.y=99,scr++),c&G&&(play(U),end()),l+=df,r.y+=df,a+=m
```

[golfme](https://abagames.github.io/kackac/index.html?golfme)

[![golfme screenshot](docs/golfme/screenshot.gif)](https://abagames.github.io/kackac/index.html?golfme)

```
tc||(p=vec(50,85),j=a=h=i=0),h+i<=0&&(h=199,i=rnd(9,99)),col=B,rect(0,90,h,9),rect(h+i,90,200,9),col=G;c=box(p,9,9);(p.x<0||p.y>99)&&(play(U),end()),j?(p.add(v),v.y+=.1,c&B&&(j=a=0,p.y=85)):(inp.ip&&(a-=.05,bar(p,20,3,a,0)),inp.ijr&&(play(J),j=1,v=vec(4).rotate(a)));s=.1*clamp(p.x-50,0,99)+df;p.x-=s,h-=s,scr+=s
```

[3arms](https://abagames.github.io/kackac/index.html?3arms)

[![3arms screenshot](docs/3arms/screenshot.gif)](https://abagames.github.io/kackac/index.html?3arms)

```
tc||(a=map(3,_=>[-PI/2,0,rnds(.01)]),x=50),map(a,(b,i)=>{col=[R,G,B][i],bar(50,50,16,3+i,b[0],-i),b[0]+=b[1]+=b[2]/(4-i),b[1]*=.95,rnd()<.01&&(b[2]=rnds(.01)*df)}),col=Y;p=clamp(inp.p.x,0,99);line(p,58,x,58)&&(play(E),end()),scr+=abs(p-x),x+=(p-x)/7
```

[balbou](https://abagames.github.io/kackac/index.html?balbou)

[![balbou screenshot](docs/balbou/screenshot.gif)](https://abagames.github.io/kackac/index.html?balbou)

```
tc||(a=map(3,_=>[-PI/2,0,rnds(.01)]),x=50),map(a,(b,i)=>{col=[R,G,B][i],bar(50,50,16,3+i,b[0],-i),b[0]+=b[1]+=b[2]/(4-i),b[1]*=.95,rnd()<.01&&(b[2]=rnds(.01)*df)}),col=Y;p=clamp(inp.p.x,0,99);line(p,58,x,58)&&(play(E),end()),scr+=abs(p-x),x+=(p-x)/7
```
