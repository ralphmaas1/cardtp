export function StatsSection() {
  return (
    <section className="py-12 mb-16 bg-secondary/30 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">250K+</p>
            <p className="text-muted-foreground">Cards Listed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">15K+</p>
            <p className="text-muted-foreground">Weekly Trades</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">99%</p>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}

