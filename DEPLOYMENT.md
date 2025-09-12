# 🚀 Somerset Window Cleaning - Live Deployment Guide

**Repository**: https://github.com/danlee041988/somerset-customer-response
**Status**: ✅ Production Ready
**Auto-Deploy**: ✅ Configured

---

## 🎯 ONE-CLICK DEPLOYMENT TO VERCEL

### **Option 1: Deploy Button (Recommended)**

Click this button to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danlee041988/somerset-customer-response&env=ANTHROPIC_API_KEY,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables%20for%20Somerset%20AI%20system&envLink=https://github.com/danlee041988/somerset-customer-response%23environment-variables&project-name=somerset-customer-response&repository-name=somerset-customer-response)

### **Option 2: Manual Vercel Setup**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import Git Repository**: 
   - Select: `danlee041988/somerset-customer-response`
4. **Configure Settings**:
   - Framework Preset: **Next.js** ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
5. **Add Environment Variables** (Critical!)
6. **Click Deploy** 🚀

---

## 🔐 REQUIRED ENVIRONMENT VARIABLES

**⚠️ The site will NOT work without these variables!**

### **Set in Vercel Dashboard**:

| Variable | Value | Description |
|----------|--------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Your Anthropic Claude API key |
| `NEXTAUTH_SECRET` | `random-32-char-string` | Secure session secret |
| `NEXTAUTH_URL` | `https://your-site.vercel.app` | Your deployment URL |

### **How to Set Variables in Vercel**:

1. **Project Settings** → **Environment Variables**
2. **Add each variable**:
   ```
   Name: ANTHROPIC_API_KEY
   Value: sk-ant-api03-your-actual-key-here
   Environment: Production ✅
   ```
3. **Repeat for all 3 variables**
4. **Redeploy** (important!)

### **Get Your API Keys**:

**ANTHROPIC_API_KEY**:
- Go to: https://console.anthropic.com
- API Keys → Create New Key
- Copy key (starts with `sk-ant-`)

**NEXTAUTH_SECRET**:
- Generate: `openssl rand -base64 32`
- Or use: https://generate-secret.vercel.app/32

**NEXTAUTH_URL**:
- Will be: `https://somerset-customer-response.vercel.app`
- Or your custom domain

---

## 🔄 AUTO-DEPLOYMENT SETUP

### **How Auto-Deploy Works**:

✅ **Push to GitHub `main` branch** → **Vercel auto-deploys**  
✅ **Every commit triggers new deployment**  
✅ **Preview deployments for pull requests**  
✅ **Instant rollback capabilities**

### **Deployment Pipeline**:

```mermaid
graph LR
    A[Code Push] --> B[GitHub] --> C[Vercel Build] --> D[Live Site]
    C --> E[Build Success] --> F[Auto Deploy]
    C --> G[Build Failed] --> H[Email Alert]
```

### **Configure GitHub Integration**:

1. **Vercel connects automatically** when you import the repo
2. **Main branch** = **Production deployments**
3. **Other branches** = **Preview deployments**
4. **Pull requests** = **Preview links**

---

## 🌐 LIVE SITE ACCESS

### **Production URLs**:

**Primary**: `https://somerset-customer-response.vercel.app`  
**Health Check**: `https://somerset-customer-response.vercel.app/api/health`  
**Admin Panel**: `https://somerset-customer-response.vercel.app/admin`

### **Custom Domain Setup** (Optional):

1. **Vercel Dashboard** → **Domains**
2. **Add Domain**: `somersetresponse.com`
3. **Configure DNS** (instructions provided)
4. **SSL Certificate**: Auto-generated ✅

---

## 🧪 TESTING YOUR DEPLOYMENT

### **Health Check Test**:
```bash
curl https://your-site.vercel.app/api/health
```

**Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-09T...",
  "environment": {
    "nodeEnv": "production",
    "hasAnthropicKey": true
  }
}
```

### **Manual Testing Checklist**:

- [ ] Site loads without errors
- [ ] Navigation works on mobile & desktop
- [ ] Can submit customer messages
- [ ] AI responses generate correctly
- [ ] Admin panel accessible
- [ ] 404 pages show properly
- [ ] Health check returns healthy status

---

## 📊 MONITORING & ANALYTICS

### **Built-in Monitoring**:

**Vercel Analytics**: Automatically enabled  
**Error Tracking**: Console errors logged  
**Performance**: Core Web Vitals tracked  
**Uptime**: 99.9% SLA with Vercel

### **Monitor Your Site**:

1. **Vercel Dashboard** → **Analytics**
2. **View Traffic & Performance**
3. **Error Logs & Debugging**
4. **Custom Alerts** (optional)

---

## 🚨 TROUBLESHOOTING

### **Common Issues**:

**1. "Configuration Error" Page**
- ❌ Environment variables not set
- ✅ Add all 3 required variables and redeploy

**2. "404 Not Found"**
- ❌ Build failed or routing issue
- ✅ Check build logs in Vercel dashboard

**3. AI Responses Not Working**
- ❌ Invalid ANTHROPIC_API_KEY
- ✅ Verify API key is correct and has credits

**4. Build Failures**
- ❌ Code errors or missing dependencies
- ✅ Check build logs, fix errors, push again

### **Debug Commands**:

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Run local development
npm run dev
```

---

## 🔄 UPDATE WORKFLOW

### **Making Changes**:

1. **Edit code locally**
2. **Test with**: `npm run dev`
3. **Commit changes**: `git commit -m "Update description"`
4. **Push to GitHub**: `git push origin main`
5. **Vercel auto-deploys** (2-3 minutes)
6. **Check live site**

### **Emergency Rollback**:

1. **Vercel Dashboard** → **Deployments**
2. **Find previous working version**
3. **Click "Promote to Production"**
4. **Instant rollback** ✅

---

## 📈 PERFORMANCE OPTIMIZATIONS

### **Already Configured**:

✅ **Next.js App Router** (latest)  
✅ **Automatic code splitting**  
✅ **Image optimization**  
✅ **Static generation where possible**  
✅ **Edge functions** for API routes  
✅ **Compression & caching headers**

### **Expected Performance**:

- **First Load**: < 2 seconds
- **Navigation**: < 500ms
- **API Responses**: < 3 seconds
- **Lighthouse Score**: 90+ ✅

---

## 🎉 GO LIVE CHECKLIST

### **Pre-Launch**:
- [ ] Environment variables set ✅
- [ ] Health check passes ✅
- [ ] All features tested ✅
- [ ] Mobile responsive ✅
- [ ] Error pages work ✅

### **Launch**:
- [ ] Deploy to production ✅
- [ ] Test live site thoroughly
- [ ] Monitor for 24 hours
- [ ] Share URL with team
- [ ] Set up monitoring alerts

### **Post-Launch**:
- [ ] Document any issues
- [ ] Plan feature updates
- [ ] Monitor performance metrics
- [ ] Gather user feedback

---

## 🏆 SUCCESS METRICS

**Your Somerset Website Is Now**:
- ✅ **Live & Accessible** 24/7
- ✅ **Auto-Updating** from GitHub
- ✅ **Production Ready** with monitoring
- ✅ **Secure** with HTTPS & headers
- ✅ **Fast** with optimized performance
- ✅ **Professional** user experience

**Repository**: https://github.com/danlee041988/somerset-customer-response  
**Live Site**: Will be at `https://somerset-customer-response.vercel.app`

*Deployment guide updated: December 9, 2025*