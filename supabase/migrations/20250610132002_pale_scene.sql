/*
  # Add Sample Blog Data

  1. Sample Data
    - Add sample user for blog posts
    - Add sample blog posts with different statuses
    - Add sample comments

  2. Updates
    - Ensure proper relationships between tables
*/

-- Insert a sample admin user if not exists
INSERT INTO "UserTable" (id, "UserName", "UserSurname", created_at) VALUES
  (1, 'Admin', 'User', now())
ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts
INSERT INTO posts (id, title, slug, content, excerpt, featured_image, author_id, category_id, status, published_at, created_at) VALUES
  (
    gen_random_uuid(),
    'Getting Started with React and TypeScript',
    'getting-started-react-typescript',
    'React and TypeScript make a powerful combination for building modern web applications. In this comprehensive guide, we''ll explore how to set up a new project, configure TypeScript properly, and leverage the benefits of static typing in your React components.

TypeScript brings several advantages to React development:
- Better IDE support with autocomplete and error detection
- Improved code maintainability and refactoring capabilities
- Enhanced developer experience with better tooling
- Reduced runtime errors through compile-time checking

Let''s start by creating a new React project with TypeScript support. The easiest way is to use Create React App with the TypeScript template:

```bash
npx create-react-app my-app --template typescript
```

This command creates a new React application with TypeScript configuration already set up. You''ll notice that instead of .js files, you now have .tsx files for components and .ts files for utility functions.

One of the key benefits of using TypeScript with React is the ability to define prop types directly in your component definitions. This makes your components more predictable and easier to use.

When working with state in TypeScript, you can specify the type of your state variables, which helps prevent common bugs and makes your code more self-documenting.

As you continue building your application, you''ll find that TypeScript''s type system becomes an invaluable tool for catching errors early and making your code more robust.',
    'Learn how to combine React and TypeScript for better development experience and more robust applications.',
    'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1,
    (SELECT id FROM categories WHERE slug = 'technology' LIMIT 1),
    'published',
    now() - interval '2 days',
    now() - interval '2 days'
  ),
  (
    gen_random_uuid(),
    'The Art of Minimalist Living',
    'art-minimalist-living',
    'Minimalism isn''t just about having fewer possessions—it''s about making room for what truly matters in your life. In our consumer-driven society, we often find ourselves surrounded by clutter, both physical and mental, that prevents us from focusing on our goals and relationships.

The journey to minimalist living begins with understanding what minimalism means to you personally. For some, it might mean owning fewer than 100 items. For others, it could simply mean being more intentional about purchases and keeping only items that serve a purpose or bring joy.

Here are some practical steps to start your minimalist journey:

**Start Small**
Begin with one area of your home, like a single drawer or closet. Don''t try to declutter your entire house in one weekend. The process should be gradual and sustainable.

**The One-Year Rule**
If you haven''t used something in the past year, you probably don''t need it. This rule works well for clothes, books, kitchen gadgets, and decorative items.

**Quality Over Quantity**
When you do make purchases, invest in high-quality items that will last longer. This approach saves money in the long run and reduces waste.

**Digital Minimalism**
Don''t forget about digital clutter. Organize your files, unsubscribe from unnecessary emails, and limit your social media consumption.

The benefits of minimalist living extend far beyond a tidy home. Many people report feeling less stressed, more focused, and having more time for activities they truly enjoy. Financial benefits are also significant, as you spend less on unnecessary items and maintenance.

Remember, minimalism is a tool to help you live more intentionally. The goal isn''t to live with as little as possible, but to live with just enough to support the life you want to lead.',
    'Discover how minimalist living can reduce stress, increase focus, and help you prioritize what truly matters.',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1,
    (SELECT id FROM categories WHERE slug = 'lifestyle' LIMIT 1),
    'published',
    now() - interval '1 day',
    now() - interval '1 day'
  ),
  (
    gen_random_uuid(),
    'Hidden Gems of Southeast Asia',
    'hidden-gems-southeast-asia',
    'Southeast Asia is renowned for its popular destinations like Bangkok, Bali, and Singapore, but the region holds countless hidden treasures waiting to be discovered by adventurous travelers. These lesser-known destinations offer authentic cultural experiences, stunning natural beauty, and the chance to explore without the crowds.

**Kampot, Cambodia**
This charming riverside town is famous for its pepper plantations and colonial architecture. The laid-back atmosphere makes it perfect for slow travel, and the nearby Bokor National Park offers excellent hiking opportunities.

**Hoi An, Vietnam**
While not entirely unknown, Hoi An''s ancient town charm and incredible food scene make it a must-visit. The monthly lantern festival transforms the town into a magical wonderland.

**Luang Prabang, Laos**
This UNESCO World Heritage site sits at the confluence of the Mekong and Nam Khan rivers. The morning alms ceremony and stunning waterfalls nearby create unforgettable experiences.

**Flores, Indonesia**
Beyond Bali lies this incredible island chain with pink beaches, traditional villages, and the famous Komodo dragons. The diving here is world-class, with pristine coral reefs and abundant marine life.

**Koh Rong, Cambodia**
This island paradise offers crystal-clear waters and bioluminescent plankton that light up the sea at night. It''s still relatively undeveloped, providing an authentic tropical island experience.

When traveling to these destinations, consider staying in locally-owned accommodations and eating at family-run restaurants. This not only provides a more authentic experience but also ensures your tourism dollars benefit local communities directly.

The best time to visit most of Southeast Asia is during the dry season (November to March), though each destination has its own optimal timing. Research local customs and dress codes, especially when visiting religious sites.

Pack light, bring a good mosquito repellent, and always have a backup plan for transportation. Most importantly, approach each destination with an open mind and respect for local cultures.',
    'Explore the lesser-known destinations of Southeast Asia that offer authentic experiences away from the tourist crowds.',
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1,
    (SELECT id FROM categories WHERE slug = 'travel' LIMIT 1),
    'published',
    now() - interval '3 days',
    now() - interval '3 days'
  ),
  (
    gen_random_uuid(),
    'Mastering the Perfect Pasta',
    'mastering-perfect-pasta',
    'Pasta is one of the most beloved dishes worldwide, yet many home cooks struggle to achieve restaurant-quality results. The secret lies not just in the sauce, but in understanding the fundamentals of pasta preparation, from selecting the right type to achieving the perfect texture.

**Choosing Your Pasta**
Different pasta shapes are designed for different sauces. Long, thin pasta like spaghetti works best with oil-based or light tomato sauces, while short pasta with ridges or tubes are perfect for chunky sauces that can cling to the surface.

**The Water Matters**
Use a large pot with plenty of water—at least 4 quarts for every pound of pasta. The water should be as salty as the sea; this is your only chance to season the pasta itself. Don''t add oil to the water, as it prevents sauce from adhering properly.

**Timing is Everything**
Start your sauce before cooking the pasta, and time everything so the sauce is ready when the pasta is done. Fresh pasta cooks in 2-3 minutes, while dried pasta typically takes 8-12 minutes depending on the shape.

**The Al Dente Secret**
Al dente means "to the tooth" in Italian—the pasta should have a slight firmness when bitten. Test a piece about 2 minutes before the package directions suggest. Remember, the pasta will continue cooking slightly when you toss it with the hot sauce.

**Pasta Water is Liquid Gold**
Always reserve a cup of pasta cooking water before draining. This starchy water helps bind the sauce to the pasta and can be used to adjust consistency.

**The Marriage**
Never rinse your pasta unless you''re making a cold salad. Instead, transfer the hot, drained pasta directly to the pan with your sauce. Toss vigorously, adding pasta water as needed to create a silky, cohesive dish.

**Classic Techniques to Master**
- Aglio e Olio: Garlic, olive oil, and chili flakes
- Cacio e Pepe: Pecorino Romano and black pepper
- Carbonara: Eggs, guanciale, and Pecorino Romano

Each of these dishes relies on technique rather than complex ingredients, making them perfect for practicing your pasta skills.',
    'Learn the essential techniques and secrets for cooking restaurant-quality pasta at home every time.',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1,
    (SELECT id FROM categories WHERE slug = 'food' LIMIT 1),
    'draft',
    null,
    now() - interval '1 hour'
  ),
  (
    gen_random_uuid(),
    'Building Responsive Web Layouts',
    'building-responsive-web-layouts',
    'Creating responsive web layouts that work seamlessly across all devices is a fundamental skill for modern web developers. With the variety of screen sizes and devices available today, responsive design isn''t just a nice-to-have feature—it''s essential for providing a good user experience.

**Mobile-First Approach**
Start designing for the smallest screen first, then progressively enhance for larger screens. This approach ensures your content is accessible on all devices and often results in cleaner, more focused designs.

**CSS Grid and Flexbox**
Modern CSS layout tools like Grid and Flexbox make responsive design much easier than the float-based layouts of the past. Grid is excellent for two-dimensional layouts, while Flexbox excels at one-dimensional arrangements.

**Breakpoints Strategy**
Choose breakpoints based on your content, not specific devices. Common breakpoints include:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px and above

**Flexible Images and Media**
Use CSS to make images responsive:
```css
img {
  max-width: 100%;
  height: auto;
}
```

**Typography Considerations**
Ensure text remains readable across all screen sizes. Use relative units like em or rem for font sizes, and consider how line length affects readability on different devices.

Testing your responsive designs across multiple devices and browsers is crucial. Browser developer tools provide excellent device simulation, but nothing replaces testing on actual devices when possible.',
    'Master the art of creating responsive web layouts that provide excellent user experience across all devices.',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    1,
    (SELECT id FROM categories WHERE slug = 'technology' LIMIT 1),
    'draft',
    null,
    now() - interval '30 minutes'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample comments
INSERT INTO comments (post_id, author_name, author_email, content, status, created_at) VALUES
  (
    (SELECT id FROM posts WHERE slug = 'getting-started-react-typescript' LIMIT 1),
    'Sarah Johnson',
    'sarah@example.com',
    'This is exactly what I needed! I''ve been wanting to learn TypeScript with React and this guide breaks it down perfectly. The code examples are really helpful.',
    'approved',
    now() - interval '1 day'
  ),
  (
    (SELECT id FROM posts WHERE slug = 'getting-started-react-typescript' LIMIT 1),
    'Mike Chen',
    'mike@example.com',
    'Great article! I especially appreciate the section about prop types. It''s made my components so much more reliable.',
    'approved',
    now() - interval '6 hours'
  ),
  (
    (SELECT id FROM posts WHERE slug = 'art-minimalist-living' LIMIT 1),
    'Emma Wilson',
    'emma@example.com',
    'I started my minimalist journey last year and this article captures the essence perfectly. The one-year rule has been a game-changer for me!',
    'approved',
    now() - interval '12 hours'
  ),
  (
    (SELECT id FROM posts WHERE slug = 'hidden-gems-southeast-asia' LIMIT 1),
    'David Rodriguez',
    'david@example.com',
    'Luang Prabang is absolutely magical! I visited last year and the morning alms ceremony was one of the most peaceful experiences of my life.',
    'pending',
    now() - interval '2 hours'
  )
ON CONFLICT DO NOTHING;