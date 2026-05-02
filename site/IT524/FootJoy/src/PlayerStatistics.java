class PlayerStatistics {
    private int touches;
    private long totalPossessionTime;
    private long lastTouchTime;
    
    public PlayerStatistics() {
        this.touches = 0;
        this.totalPossessionTime = 0;
    }
    
    public void addTouch() {
        touches++;
        lastTouchTime = System.currentTimeMillis();
    }
    
    public void endPossession() {
        if (lastTouchTime > 0) {
            totalPossessionTime += System.currentTimeMillis() - lastTouchTime;
        }
    }
    
    public int getTouches() { return touches; }
    public long getTotalPossessionTime() { return totalPossessionTime; }
}