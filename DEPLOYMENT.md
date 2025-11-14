# Farkle Game - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. Push this repository to GitHub
2. Visit [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration from `vercel.json`
6. Click "Deploy"
7. Your app will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd /path/to/Farkle

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

## PWA Installation

Once deployed, users can install the app:

### iOS (iPhone/iPad)
1. Open the deployed URL in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. The Farkle game icon will appear on your home screen

### Android
1. Open the deployed URL in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home Screen" or "Install App"
4. Confirm the installation
5. The Farkle game icon will appear in your app drawer

### Desktop (Chrome/Edge/Brave)
1. Open the deployed URL
2. Look for the install icon in the address bar (or menu)
3. Click "Install"
4. The game will open as a standalone app

## Environment Configuration

No environment variables are required. The app is purely client-side JavaScript.

## Custom Domain Setup

### On Vercel:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Vercel handles SSL certificates automatically

## Testing the PWA Locally

```bash
# Start a local server
python3 -m http.server 8000
# or
npx serve
# or
php -S localhost:8000

# Visit http://localhost:8000
```

**Note**: Service workers require HTTPS in production, but work with `localhost` for testing.

## Performance Optimization

The app is already optimized with:
- ✅ Service worker caching for offline support
- ✅ Minimal dependencies (vanilla JavaScript)
- ✅ Optimized PNG icons
- ✅ CSS Grid and Flexbox for efficient layouts
- ✅ No external API calls or databases

## Browser Compatibility

### Fully Supported:
- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+
- Opera 76+

### PWA Features:
- ✅ Service Workers
- ✅ Web App Manifest
- ✅ Add to Home Screen
- ✅ Offline functionality
- ✅ App-like experience

## Monitoring & Analytics (Optional)

To add analytics, insert your tracking code in `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Service Worker Not Updating
```javascript
// Clear old cache in browser DevTools:
// Application > Storage > Clear site data
```

### PWA Not Installable
- Verify HTTPS is enabled (required in production)
- Check that manifest.json is accessible
- Verify all icon sizes are present
- Check browser console for errors

### Icons Not Displaying
- Verify all 8 icon sizes exist in `/icons/` directory
- Check manifest.json paths are correct
- Clear browser cache and reload

## Support

For issues or questions:
1. Check the [README.md](README.md) for game rules
2. Review browser console for errors
3. Verify all files are deployed correctly
4. Check Vercel deployment logs

## License

MIT License - Free to use and modify
