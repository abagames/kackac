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
tc||(a=range(3).map(_=>[-PI/2,0,rnds(.01)]),x=50),a.map((b,i)=>{col=[R,G,B][i],bar(50,50,16,3+i,b[0],-i),b[0]+=b[1]+=b[2]/(4-i),b[1]*=.95,rnd()<.01&&(b[2]=rnds(.01)*df)}),col=Y;p=clamp(inp.p.x,0,99);line(p,58,x,58)&&(play(E),end()),scr+=abs(p-x),x+=(p-x)/7
```

[balbou](https://abagames.github.io/kackac/index.html?balbou)

[![balbou screenshot](docs/balbou/screenshot.gif)](https://abagames.github.io/kackac/index.html?balbou)

```
tc||(b=[]),tc%222==0&&b.push({p:vec(50,10),v:vec(rnds(.5),0)}),col=G,box(x=inp.p.x,90,20,10),col=P,b=b.filter(c=>{p=c.p,v=c.v;return p.add(v),v.y+=.02*df,v.mul(.99),box(p,5,5)&G&&(v.y=-2*sqrt(df),v.x+=.05*(p.x-x),scr+=pow(b.length,2),play(C)),p.y>99&&(play(U),end()),p.x>0&&p.x<99})
```

[jujmp](https://abagames.github.io/kackac/index.html?jujmp)

[![jujmp screenshot](docs/jujmp/screenshot.gif)](https://abagames.github.io/kackac/index.html?jujmp)

```
tc||(p=vec(50,50),v=vec(),w=[vec(50,70)],j=m=d=1),p.add(v),v.y+=inp.ip?.05:.1;s=(p.y<30?.1*(30-p.y):0)+.1*df;for(scr+=s,(d-=s)<0&&(d=rnd(99),w.push(vec(rnd(99),-9))),p.y+=s,col=B,w=w.filter(l=>(l.y+=s,box(l,33,7),l.y<99)),col=T;box(p,7,7);)p.y--,v.set(),m=1;col=G,box(p,7,7),inp.ijp&&(play(J),v.x=j*=-1,v.y=-3*m,m*=.7),p.y>99&&(play(E),end())
```
